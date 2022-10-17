
import { FunctionComponent, useContext, useEffect } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import TextsStepper from 'app/ui/common/steppers/texts-stepers';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import PreviousNextButtons from 'app/ui/common/button/previous-next-buttons';
import PaymentMethods from 'app/ui/component/payment/payment-methods';
import PaymentManualInfo from 'app/ui/component/payment/payment-manual-info';

const ifoManualPayment: Array<any> = [
    {
        label: "Monto a transferir",
        text: "XXXXXX"
    },
    {
        label: "Nombre",
        text: "COMERCIO EXAMPLE SPA"
    },
    {
        label: "Rut Empresa",
        text: "77.887.987-1"
    },
    {
        label: "Cuenta N°",
        text: "00-123-1234-12"
    },
    {
        label: "Banco",
        text: "Banco Chile"
    },
    {
        label: "Tipo Cuenta",
        text: "Cuenta Corriente"
    },
    {
        label: "Email",
        text: "pay@myemma.cl"
    },
];



/**
 * PaymentPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
const SuccessPage: FunctionComponent = () => {
    const { session } = useContext(SessionContext) as ISessionContext;
    const { cartItems,
        cartSubTotal,
        removeFromCart,
        getCartCount,
        changeItemQuantity } = useContext(CartContext) as ICartContext;

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {

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


            <PaymentManualInfo list={ifoManualPayment} />

            <p>En cuando haga tu transferencia por  favor enviar el comprobante a payment@micomercio.cl, para acreditar tu pago y proceder con el envió.
                Gracias</p>

        </div>
    );
};

export default SuccessPage;