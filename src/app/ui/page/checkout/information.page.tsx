import { FunctionComponent, useContext, useEffect } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import TextsStepper from 'app/ui/common/steppers/texts-stepers';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';


/**
 * InformationPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
const InformationPage: FunctionComponent = () => {
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
                key: "cart",
                "name": t("cart"),
                "checked": true,
                "current": false
            },
            {
                key: "information",
                "name": t("information"),
                "checked": false,
                "current": true
            },
            {
                key: "confirmation",
                "name": t("confirmation"),
                "checked": false,
                "current": false
            },
            {
                key: "payment",
                "name": t("payment"),
                "checked": false,
                "current": false
            },
            {
                key: "success",
                "name": t("success"),
                "checked": false,
                "current": false
            }
        ];
        setSteps(initialSteps);
    }, []);

    const changeStep = (index: number) => {
        if (index === 0) navigate("/cart");
        alert(index);
    }

    const isNotLogged = () => {
        return session && !session.isLogged;
    };

    return (
        <div className="container-page">

            <TextsStepper list={steps} onClick={(index: number) => changeStep(index)}></TextsStepper>

            Yu can singin, singup or continue as anonymous.
            Contact info:........
            Delivery Address info:.......
            Continuos...

        </div>
    );
};

export default InformationPage;