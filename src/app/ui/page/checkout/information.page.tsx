import { FunctionComponent, useContext, useEffect, useState } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import TextsStepper from 'app/ui/common/steppers/texts-stepers';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import useProfile from 'domain/hook/profile.hook';
import UserContactInfoForm from 'app/ui/component/checkout/user-contact-info-form';

/**
 * InformationPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
const InformationPage: FunctionComponent = () => {
    const { session } = useContext(SessionContext) as ISessionContext;
    const { isProcessing, hasError, msg, isSuccess, getInitialProfile, getProfile, updateProfile } = useProfile();
    const { cartItems,
        cartSubTotal,
        removeFromCart,
        getCartCount,
        changeItemQuantity } = useContext(CartContext) as ICartContext;
    const { steps, setSteps } = useContext(CheckoutContext) as ICheckoutContext;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [initialized, setInitialized] = useState(false);
    const [profile, setProfile] = useState(getInitialProfile()); //puede colocarse en el hook

    const fetchData = async () => {
        try {
            if (session && session.isLogged) {
                const username = session ? session.userName : '';
                const info = await getProfile(username);
                console.log('****************UserProfile PAGE fetchData.info', info);
                if (info.userName) {
                    setProfile({
                        ...profile,
                        userName: info.userName,
                        firstName: info.firstName,
                        lastName: info.lastName,
                        email: info.email,
                        docType: info.docType ? info.docType.toUpperCase() : '',
                        document: info.document,
                        telephone: info.telephone,
                        language: info.language ? info.language.toLowerCase() : '',
                        addresses: info.addresses
                    });

                }
            }
        } catch (e) {
            console.log("Error in UserProfile fetchData:", e);
        }

        setInitialized(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const handleUpdateSubmit = async () => {
        try {
            console.log('handleUpdateSubmit... TODO...');
            //await updateProfile(profile);
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <div className="container-page">

            <TextsStepper list={steps} onClick={(index: number) => changeStep(index)}></TextsStepper>

            <UserContactInfoForm initialized={initialized} profile={profile}
                onChange={(profile: any) => setProfile(profile)}
                onSubmit={() => handleUpdateSubmit()} />

        </div>
    );
};

export default InformationPage;