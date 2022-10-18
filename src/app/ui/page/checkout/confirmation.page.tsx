
import { FunctionComponent, useContext, useEffect } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import TextsStepper from 'app/ui/common/steppers/texts-stepers';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import PreviousNextButtons from 'app/ui/common/button/previous-next-buttons';
import ShoppingCartItem from 'app/ui/component/cart/shopping-cart/shopping-cart-item';
import ShoppingCart from 'app/ui/component/cart/shopping-cart/shopping-cart';
import { useShipping } from 'domain/hook/shipping.hook';
import CircularProgress from 'app/ui/common/progress/circular-progress';
import Alert from 'app/ui/common/alert/alert';
import useAddress from 'domain/hook/address.hook';
import ShippingData from 'app/ui/component/checkout/shipping-data';


/**
 * ConfirmationPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
const ConfirmationPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { convertAddressToString } = useAddress(); //Custom hook
    const { session } = useContext(SessionContext) as ISessionContext; // with Custom hook
    const { isProcessing, hasError, msg, isSuccess, getShippingPrice } = useShipping(); // Custom hook
    const { cartItems, cartSubTotal, removeFromCart, getCartCount,
        changeItemQuantity, cartShipping, cartTotal, getMoney } = useContext(CartContext) as ICartContext; // with Custom hook
    const { profileInitialized,
        setProfileInitialized,
        currentSelectedAddresIndex,
        setCurrentSelectedAddresIndex, profile, setProfile, setShippingPrice, canContinueToPayment } = useContext(CheckoutContext) as ICheckoutContext; //With Custom hook


    const fetchData = async () => {
        try {
            const address = profile.addresses[currentSelectedAddresIndex];
            const data = await getShippingPrice(address);
            setShippingPrice(data);
        } catch (e) {
            console.log("Error in getShippingPrice fetchData:", e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const changeStep = (index: number) => {
        if ((index === 0)) navigate("/cart", { state: location });
        if ((index === 1)) handlePrevious();
        if (index === 3) handleNext();
    }

    const handlePrevious = () => {
        navigate("/checkout/information"); // programmatically redirect
    };

    const handleNext = (): void => {
        if (canContinueToPayment()) navigate("/checkout/payment"); // programmatically redirect
    };

    const getAddressStr = () => {
        if (!profile.addresses[currentSelectedAddresIndex]) return "Address problem!";
        return convertAddressToString(profile.addresses[currentSelectedAddresIndex]);
    }

    return (
        <div className="container-page">

            <TextsStepper list={[
                { "name": t("steps.cart"), "current": false },
                { "name": t("steps.information"), "current": false },
                { "name": t("steps.confirmation"), "current": true },
                { "name": t("steps.payment"), "current": false },
                { "name": t("steps.success"), "current": false }
            ]} onClick={(index: number) => changeStep(index)}></TextsStepper>

            <h1>{t('checkout.confirmation.title')}</h1>

            <ShippingData contactTo={profile?.email} shippingTo={getAddressStr()} />

            <ShoppingCart
                money={getMoney()}
                empty={cartItems.length === 0}
                count={getCartCount()}
                subtotal={cartSubTotal}
                shipping={cartShipping}
                total={cartTotal}
                onClick={() => { }}
            >
                {cartItems.map((item, index) => (
                    <ShoppingCartItem
                        key={index}
                        item={item}
                        qtyChangeHandler={changeItemQuantity}
                        removeHandler={removeFromCart}
                    />
                ))}

            </ShoppingCart>

            <PreviousNextButtons labelPrevious={t('previous')} labelNext={t('checkout.button.confirm')}
                handlePrevious={() => handlePrevious()} handleNext={() => handleNext()} />

            {isProcessing && (
                <CircularProgress>{t('login.info.loading')}</CircularProgress>
            )}

            {hasError && <Alert severity="error">{t(msg)}</Alert>}

        </div>
    );
};

export default ConfirmationPage;