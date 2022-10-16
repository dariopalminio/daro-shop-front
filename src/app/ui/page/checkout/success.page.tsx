
import { FunctionComponent, useContext, useEffect } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import TextsStepper from 'app/ui/common/steppers/texts-stepers';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import PreviousNextButtons from 'app/ui/common/button/previous-next-buttons';
import PaymentMethods from 'app/ui/component/payment/payment-methods';


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

            <h1>{t('checkout.payment.title')}</h1>

            <TextsStepper list={[
                { "name": t("steps.cart"), "current": false },
                { "name": t("steps.information"), "current": false },
                { "name": t("steps.confirmation"), "current": false },
                { "name": t("steps.payment"), "current": false },
                { "name": t("steps.success"), "current": true }
            ]} onClick={(index: number) => {}}></TextsStepper>

            
    <h2>Pago Manual: (Transferencia Bancaria)</h2>

    <p>Monto a transferir: XXXXXX</p>
    <p>Nombre : COMERCIO EXAMPLE SPA</p> 
    <p>Rut Empresa :77.887.987-1 </p>
    <p>Cuenta N°: 00-123-1234-12</p>
    <p>Banco: Banco Chile</p>
    <p>Tipo Cuenta : Cuenta Corriente</p>
    <p>Email : pay@myemma.cl </p>
    <p>En cuando haga tu transferencia por  favor enviar el comprobante a payment@micomercio.cl, para acreditar tu pago y proceder con el envió.
    Gracias</p>

            
        </div>
    );
};

export default SuccessPage;