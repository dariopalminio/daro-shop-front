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
import PreviousNextButtons from "app/ui/common/button/previous-next-buttons";

const expresionsRegularByDefault = {
    firstName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
    lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    docType: /\s*/g, //always true
    document: /\s*/g, //always true
    telephone: /^\d{7,14}$/ // 7 to 14 numbers.
};

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
    const { steps, setSteps, profileInitialized,
        setProfileInitialized,
        currentSelectedAddresIndex,
        setCurrentSelectedAddresIndex, profile, setProfile, addressToDelivery,
        setAddressToDelivery } = useContext(CheckoutContext) as ICheckoutContext;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [initialized, setInitialized] = useState(false);

    const [hasValidationError, setHasValidationError] = useState(false);


    const fetchData = async () => {
        try {
            if (session && session.isLogged && !profileInitialized) {
                const username = session ? session.userName : '';
                const info = await getProfile(username);
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
                    setProfileInitialized(true);
                }
            }
            setInitialized(true);
        } catch (e) {
            console.log("Error in UserProfile fetchData:", e);
        }
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
                "current": false,
                "path": "/cart"
            },
            {
                key: "information",
                "name": t("information"),
                "checked": false,
                "current": true,
                "path": "/checkout/information"
            },
            {
                key: "confirmation",
                "name": t("confirmation"),
                "checked": false,
                "current": false,
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
    }, []);

    const changeStep = (index: number) => {
        if (index === 0) navigate(steps[index].path);
        if (index === 2) handleNext();
    }

    const isNotLogged = () => {
        return session && !session.isLogged;
    };

    const handleOnClickSelect = (item: string, index: number) => {
        const addrsSelected = profile.addresses[index];
        console.log("addrsSelected:", addrsSelected);
        setAddressToDelivery(addrsSelected);
        setCurrentSelectedAddresIndex(index);
    };

    const handleAddNeAddressAndClose = (newAddresses: Array<any>): void => {
        setProfile({
            ...profile,
            addresses: newAddresses
        });
    };

    const handleChangeSomeField = (profile: any, isVaslid: boolean): void => {
        setProfile(profile);
    };

    const isAddressSelected = (): boolean => {
        return (currentSelectedAddresIndex > -1);
    }

    const areFieldsValid = (): boolean => {
        const fieldsOk: boolean = (expresionsRegularByDefault.firstName.test(profile.firstName) && 
        expresionsRegularByDefault.lastName.test(profile.lastName) && 
        expresionsRegularByDefault.email.test(profile.email));
        return fieldsOk && isAddressSelected();
      }

    const handleNext = (): void => {
        setHasValidationError(!areFieldsValid());
        if (areFieldsValid()) navigate("/checkout/confirmation");
    };

    const handlePrevious = () => {
        navigate("/cart");
    };

    return (
        <div className="container-page">

            <TextsStepper list={steps} onClick={(index: number) => changeStep(index)}></TextsStepper>

            {isNotLogged() && <AnonymousProfile redirectTo="information" />}

            <div className="wrapper-checkout-information">

                <div className="wrapper-contact-user-data">
                    <UserContactInfo profile={profile}
                        expresionsRegular={expresionsRegularByDefault}
                        onChange={(profile: any, isVaslid: boolean) => handleChangeSomeField(profile, isVaslid)}
                    />
                </div>
                <div className="wrapper-delivery-address">
                    {initialized && <>
                        <SelectAddress title={t("information.delivery.addres.title")}
                            country={"Chile"}
                            currentSelected={currentSelectedAddresIndex}
                            addresses={profile.addresses}
                            onChange={(newAddresses: Array<any>) => handleAddNeAddressAndClose(newAddresses)}
                            onClickSelect={(item: string, index: number) => handleOnClickSelect(item, index)}
                        />

                    </>
                    }
                </div>
            </div>

            {hasValidationError && <Alert severity="info">{t('checkout.info.validation.error')}</Alert>}

            <PreviousNextButtons labelPrevious={t('previous')} labelNext={t('next')}
                handlePrevious={() => handlePrevious()} handleNext={() => handleNext()} />
        </div>
    );
};

export default InformationPage;