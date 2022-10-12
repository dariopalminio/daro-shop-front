import "./information-page.css";
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import TextsStepper from 'app/ui/common/steppers/texts-stepers';
import { useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import useProfile from 'domain/hook/profile.hook';
import UserContactInfo from 'app/ui/component/checkout/user-contact-info';
import SelectAddress from 'app/ui/component/address/select-address';
import Button from 'app/ui/common/button/button';
import { CenteringContainer } from 'app/ui/common/elements/centering-container';
import AnonymousProfile from "../../component/user/profile/anonymous-profile";
import { Profile } from "domain/model/user/profile.type";
import Alert from "app/ui/common/alert/alert";

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
    const { steps, setSteps, profile, setProfile, addressToDelivery,
        setAddressToDelivery } = useContext(CheckoutContext) as ICheckoutContext;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [initialized, setInitialized] = useState(false);
    const [hasErrorOfValidation, setHasErrorOfValidation] = useState(false);

    const fetchData = async () => {
        try {
            if (session && session.isLogged) {
                const username = session ? session.userName : '';
                const info = await getProfile(username);
                console.log('****************UserProfile PAGE fetchData.info', info);
                if (info.userName) {
                    const p: Profile = {
                        ...profile,
                        userName: info.userName ? info.userName : '',
                        firstName: info.firstName ? info.firstName : '',
                        lastName: info.lastName ? info.lastName : '',
                        email: info.email ? info.email : '',
                        docType: info.docType ? info.docType.toUpperCase() : '',
                        document: info.document ? info.document : '',
                        telephone: info.telephone ? info.telephone : '',
                        language: info.language ? info.language.toLowerCase() : '',
                        addresses: info.addresses ? info.addresses : []
                    };
                    setProfile(p);

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

    const handleOnClickSelect = (item: string, index: number) => {
        const addrsSelected = profile.addresses[index];
        console.log("addrsSelected:", addrsSelected);
        setAddressToDelivery(addrsSelected);
    };

    const handleAddNeAddressAndClose = (newAddresses: Array<any>): void => {
        setProfile({
            ...profile,
            addresses: newAddresses
        })
    };

    const isInfoValid = (): boolean => {
        const isValidFields = ((profile.email.trim() !== '') && addressToDelivery !== undefined);
        setHasErrorOfValidation(!isValidFields);
        return isValidFields;
    };

    const handleNext = (): void => {
        console.log("profile:", profile);
        console.log("hasErrorOfValidation", hasErrorOfValidation)
        if (isInfoValid()) console.log("OKKKKKKKKKKKKKKKK")
    };

    return (
        <div className="container-page">

            <TextsStepper list={steps} onClick={(index: number) => changeStep(index)}></TextsStepper>

            {isNotLogged() && <AnonymousProfile redirectTo="information" />}

            <div className="wrapper-checkout-information">

                <div className="wrapper-contact-user-data">
                    <UserContactInfo profile={profile}
                        onChange={(profile: any) => setProfile(profile)}
                    />
                </div>
                <div className="wrapper-delivery-address">
                    {initialized && <>
                        <SelectAddress title={t("information.delivery.addres.title")}
                            country={"Chile"}
                            addresses={profile.addresses}
                            onChange={(newAddresses: Array<any>) => handleAddNeAddressAndClose(newAddresses)}
                            onClickSelect={(item: string, index: number) => handleOnClickSelect(item, index)}
                        />

                    </>
                    }
                </div>
            </div>

            <div style={{ ...{ margin: "0px auto", left: "0" } }}>
                <CenteringContainer>

                    <Button
                        type="button"
                        style={{ marginTop: "5px" }}
                        onClick={() => handleNext()}
                    >
                        {t('next')}
                    </Button>


                </CenteringContainer>
            </div>

            {hasErrorOfValidation && <Alert severity="error">{t('checkout.info.validation.error')}</Alert>}
        </div>
    );
};

export default InformationPage;