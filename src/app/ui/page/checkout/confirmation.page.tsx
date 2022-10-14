
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


/**
 * ConfirmationPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
const ConfirmationPage: FunctionComponent = () => {
    const navigate = useNavigate(); 
    const { t } = useTranslation();
    const { session } = useContext(SessionContext) as ISessionContext; // with Custom hook
    const { isProcessing, hasError, msg, isSuccess, getShippingPrice } = useShipping(); // Custom hook
    const { cartItems, cartSubTotal, removeFromCart, getCartCount,
        changeItemQuantity, cartShipping, cartTotal, canContinueToPayment, getMoney } = useContext(CartContext) as ICartContext; // with Custom hook
    const { steps, setSteps, profile, currentSelectedAddresIndex, shippingData, setShippingPrice } = useContext(CheckoutContext) as ICheckoutContext; // with Custom hook

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
        const initialSteps = [
            {
                key: "cart",
                "name": t("cart"),
                "checked": true,
                "current": false,
                "path": "/cart"
            },
            {
                key: "information",
                "name": t("information"),
                "checked": true,
                "current": false,
                "path": "/checkout/information"
            },
            {
                key: "confirmation",
                "name": t("confirmation"),
                "checked": false,
                "current": true,
                "path": "/checkout/confirmation"
            },
            {
                key: "payment",
                "name": t("payment"),
                "checked": false,
                "current": false,
                "path": "/checkout/payment"
            },
            {
                key: "success",
                "name": t("success"),
                "checked": false,
                "current": false,
                "path": "/checkout/success"
            }
        ];
        setSteps(initialSteps);
        fetchData();
    }, []);

    const changeStep = (index: number) => {
        if ((index === 0) || (index === 1)) navigate(steps[index].path);
        if (index === 3) handleNext();
    }

    const handlePrevious = () => {
        navigate(steps[1].path);
    };

    const handleNext = (): void => {
        if (canContinueToPayment()) navigate(steps[3].path);
    };

    return (
        <div className="container-page">

            <TextsStepper list={steps} onClick={(index: number) => changeStep(index)}></TextsStepper>

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

            <PreviousNextButtons labelPrevious={t('previous')} labelNext={t('next')}
                handlePrevious={() => handlePrevious()} handleNext={() => handleNext()} />

            {isProcessing && (
                <CircularProgress>{t('login.info.loading')}</CircularProgress>
            )}

            {hasError && <Alert severity="error">{t(msg)}</Alert>}

        </div>
    );
};

export default ConfirmationPage;