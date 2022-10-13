
import { FunctionComponent, useContext, useEffect } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import TextsStepper from 'app/ui/common/steppers/texts-stepers';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import PreviousNextButtons from 'app/ui/common/button/previous-next-buttons';
import ResumeCartItem from 'app/ui/component/checkout/resume-cart-item';
import ResumeCart from 'app/ui/component/checkout/resume-cart';


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
    const { steps, setSteps, profile, currentSelectedAddresIndex, getShippingPrice, shippingData } = useContext(CheckoutContext) as ICheckoutContext;
    const navigate = useNavigate();
    const { t } = useTranslation();

    const fetchData = async () => {
        try {
            const address = profile.addresses[currentSelectedAddresIndex];
            await getShippingPrice(address);
        } catch (e) {
            console.log("Error in getShippingPrice fetchData:", e);
        }
    };

    useEffect(() => {
        console.log("CheckoutPage...");
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
    };

    const isNotLogged = () => {
        return session && !session.isLogged;
    };

    return (
        <div className="container-page">

            <TextsStepper list={steps} onClick={(index: number) => changeStep(index)}></TextsStepper>



            <ResumeCart
                empty={cartItems.length === 0}
                count={getCartCount()}
                subtotal={cartSubTotal}
                onClick={()=>{}}
            >
                {cartItems.map((item, index) => (
                    <ResumeCartItem
                        key={item.id+index.toString()}
                        item={item}
                        qtyChangeHandler={changeItemQuantity}
                        removeHandler={removeFromCart}
                    />
                ))}

            </ResumeCart>

            Resumme...
            Price Shipping / Despacho: {shippingData?.price}

            <PreviousNextButtons labelPrevious={t('previous')} labelNext={t('next')}
                handlePrevious={() => handlePrevious()} handleNext={() => handleNext()} />

        </div>
    );
};

export default ConfirmationPage;