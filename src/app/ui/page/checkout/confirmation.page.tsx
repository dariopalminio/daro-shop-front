
import { FunctionComponent, useContext, useEffect } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import TextsStepper from 'app/ui/common/steppers/texts-stepers';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';


/**
 * ConfirmationPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
const ConfirmationPage: FunctionComponent = () => {
    const { session } = useContext(SessionContext) as ISessionContext;
    const { cartItems,
        cartSubTotal,
        removeFromCart,
        getCartCount,
        changeItemQuantity } = useContext(CartContext) as ICartContext;
    const { steps, setSteps } = useContext(CheckoutContext) as ICheckoutContext;
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        console.log("CheckoutPage...");
        const initialSteps = [
            {
                "name": t("cart"),
                "checked": true,
                "current": false
            },
            {
                "name": t("information"),
                "checked": true,
                "current": false
            },
            {
                "name": t("confirmation"),
                "checked": false,
                "current": true
            },
            {
                "name": t("payment"),
                "checked": false,
                "current": false
            },
            {
                "name": t("success"),
                "checked": false,
                "current": false
            }
        ];
        setSteps(initialSteps);
    }, []);
    
    const changeStep = (index: number) => {
        if (index===0) navigate("/cart");
        alert("index");
    }

    const isNotLogged = () => {
        return session && !session.isLogged;
      };
      
    return (
        <div className="container-page">

            <TextsStepper list={steps} onClick={(index: number) => changeStep(index)}></TextsStepper>

           Resumme...
        </div>
    );
};

export default ConfirmationPage;