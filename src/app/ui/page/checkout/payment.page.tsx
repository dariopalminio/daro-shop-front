
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import TextsStepper from 'app/ui/common/steppers/texts-stepers';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import PreviousNextButtons from 'app/ui/common/button/previous-next-buttons';
import PaymentMethods from 'app/ui/component/payment/payment-methods';

export enum PaymentMethodType {
    MANUAL = "MANUAL",
    OTHER = "OTHER",
  }

/**
 * PaymentPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
const PaymentPage: FunctionComponent = () => {
    const { session } = useContext(SessionContext) as ISessionContext;
    const { cartItems,
        cartSubTotal,
        removeFromCart,
        getCartCount,
        changeItemQuantity } = useContext(CartContext) as ICartContext;

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [payMethodName, setPayMethodName] = useState<string>(PaymentMethodType.MANUAL);


    useEffect(() => {

    }, []);

    const changeStep = (index: number) => {
        if ((index === 0)) navigate("/cart", { state: location });
        if ((index === 1)) navigate("/checkout/information");
        if (index === 2) handlePrevious();
    }

    const isNotLogged = () => {
        return session && !session.isLogged;
    };

    const handlePrevious = () => {
        navigate("/checkout/confirmation"); // programmatically redirect
    };

    const handleNext = (): void => {
        navigate("/checkout/success"); // programmatically redirect
    };

    return (
        <div className="container-page">

            <TextsStepper list={[
                { "name": t("steps.cart"), "current": false },
                { "name": t("steps.information"), "current": false },
                { "name": t("steps.confirmation"), "current": false },
                { "name": t("steps.payment"), "current": true },
                { "name": t("steps.success"), "current": false }
            ]} onClick={(index: number) => changeStep(index)}></TextsStepper>

            <h1>{t('checkout.payment.title')}</h1>

            <PaymentMethods select={payMethodName} onChange={(value: string) => setPayMethodName(value)} />

            <PreviousNextButtons labelPrevious={t('previous')} labelNext={t('checkout.button.pay')}
                handlePrevious={() => handlePrevious()} handleNext={() => handleNext()} />
        </div>
    );
};

export default PaymentPage;