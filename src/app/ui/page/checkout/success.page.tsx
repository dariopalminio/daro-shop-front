
import { FunctionComponent, useContext, useEffect } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import PaymentManualInfo from 'app/ui/component/payment/payment-manual-info';
import { usePayment } from 'domain/hook/payment/payment.hook';
import { TextsStepper } from "oaky-ui-kit";

const SuccessPage: FunctionComponent = () => {
    const { session } = useContext(SessionContext) as ISessionContext;
    const { cartTotal, getMoney, cartItems,
        cartSubTotal,
        removeFromCart,
        getCartCount,
        changeItemQuantity, emptyTheCart } = useContext(CartContext) as ICartContext;
        const { order
        } = useContext(CheckoutContext) as ICheckoutContext; //With Custom hook
    const { getBankTransferInfo, bankTransferInfo } = usePayment();
    const navigate = useNavigate();
    const { t } = useTranslation();


    useEffect(() => {
        getBankTransferInfo();
        emptyTheCart();
    }, []);

    return (
        <div className="container-page">

            <TextsStepper list={[
                { "name": t("steps.cart"), "current": false },
                { "name": t("steps.information"), "current": false },
                { "name": t("steps.confirmation"), "current": false },
                { "name": t("steps.payment"), "current": false },
                { "name": t("steps.success"), "current": true }
            ]} onClick={(index: number) => { }}></TextsStepper>

            <h1>{t("checkout.payment.manual")}</h1>

            <div style={{margin: "10px"}}>
                <p>{t("checkout.payment.manual.bank.amount")}: {getMoney()} $ {cartTotal}</p>
                <p>{t("checkout.payment.manual.bank.info")}:</p>

                <PaymentManualInfo list={bankTransferInfo} />

                <p>{t("checkout.payment.manual.bank.msg.order.code")}: {order?.id}</p>
                <p>{t("checkout.payment.manual.bank.msg.email")}</p>

            </div>
        </div>
    );
};

export default SuccessPage;