
import { FunctionComponent, useContext, useEffect } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import ShoppingCartItem from 'app/ui/component/cart/shopping-cart/shopping-cart-item';
import ShoppingCart from 'app/ui/component/cart/shopping-cart/shopping-cart';
import useAddress from 'domain/hook/address.hook';
import ShippingData from 'app/ui/component/checkout/shipping-data';
import { PreviousNextButtons, TextsStepper, CircularProgress, Alert } from "oaky-ui-kit";

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
    const { cartItems, cartSubTotal, removeFromCart,
        changeItemQuantity, cartShipping, cartTotal, getMoney } = useContext(CartContext) as ICartContext; // with Custom hook
    const { isProcessing,
        hasError,
        msg,
        isSuccess, profileInitialized,
        setProfileInitialized,
        currentSelectedAddresIndex,
        setCurrentSelectedAddresIndex, profile, setProfile, setShippingPrice, canContinueToPayment, initializeOrder, order, includesShipping } = useContext(CheckoutContext) as ICheckoutContext; //With Custom hook


    const fetchData = async () => {
        try {
            console.log("useEffect-->fetchData");
            if (!order) initializeOrder(); //create new order in server
            else alert("an order already exists! It must be updated (TODO...)");
        } catch (e) {
            console.log("Error in initializeOrder fetchData:", e);
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

    //Confirm
    const handleNext = (): void => {
        if (canContinueToPayment()) navigate("/checkout/payment"); // programmatically redirect
    };

    const getShippingInfo = () => {
        if (includesShipping){
            if (!order?.shippingAddress) return t('checkout.shipping.address.error');
            return convertAddressToString(order?.shippingAddress);
        }
        return t('checkout.shipping.type.pickup'); //pick up in store, no delivery
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

            {order && <ShippingData
                contactTo={order?.client?.email ? order?.client.email : 'Error'}
                shippingTo={getShippingInfo()} />
            }

            {order &&
                <ShoppingCart
                    money={getMoney()}
                    order={order}
                    onClick={() => { }}
                >
                    {order.orderItems.map((item, index) => (
                        <ShoppingCartItem
                            readOnly={true}
                            key={index}
                            item={item}
                            qtyChangeHandler={changeItemQuantity}
                            removeHandler={removeFromCart}
                        />
                    ))}

                </ShoppingCart>
            }

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