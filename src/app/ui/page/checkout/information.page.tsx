import "./information-page.css";
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from 'react-i18next';
import CheckoutContext, { ICheckoutContext } from 'domain/context/checkout.context';
import TextsStepper from 'app/ui/common/steppers/texts-stepers';
import { useLocation, useNavigate } from 'react-router-dom';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import useProfile from 'domain/hook/profile.hook';
import UserContactInfo from 'app/ui/component/checkout/user-contact-info';
import SelectAddress from 'app/ui/component/address/select-address';
import AnonymousProfile from "../../component/user/profile/anonymous-profile";
import { Profile } from "domain/model/user/profile.type";
import Alert from "app/ui/common/alert/alert";
import PreviousNextButtons from "app/ui/common/button/previous-next-buttons";
import useAddress from "domain/hook/address.hook";
import CircularProgress from "app/ui/common/progress/circular-progress";

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
    const { session } = useContext(SessionContext) as ISessionContext;  //With Custom hook
    const { getCurrentCountry } = useAddress(); //Custom hook
    const { isProcessing, hasError, msg, isSuccess, getProfile } = useProfile(); //Custom hook
    const { cartItems, cartSubTotal, removeFromCart, getCartCount,
        changeItemQuantity, cartShipping, cartTotal, canContinueToPayment, getMoney } = useContext(CartContext) as ICartContext; // with Custom hook
    const { profileInitialized,
        setProfileInitialized,
        currentSelectedAddresIndex,
        setCurrentSelectedAddresIndex, profile, setProfile, addressToDelivery,
        setAddressToDelivery } = useContext(CheckoutContext) as ICheckoutContext; //With Custom hook
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [hasValidationError, setHasValidationError] = useState(false);
    const location = useLocation();

    const fetchData = async () => {
        try {
            if (session && session.isLogged) {
                console.log("InformationPage-->Loading profile...");
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
        } catch (e) {
            console.log("Error in UserProfile fetchData:", e);
        }
    };

    useEffect(() => {
        console.log("InformationPage-->useEffect");
        if (!profileInitialized) fetchData();
    }, []);

    const changeStep = (index: number) => {
        if (index === 0) handlePrevious();
        if (index === 2) handleNext();
    }

    const isNotLogged = () => {
        return session && !session.isLogged;
    };

    const handleOnClickSelect = (item: string, index: number) => {
        const addrsSelected = profile.addresses[index];
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

    const canSelectAddress = (): boolean => {
        return (profile!=undefined && profile.addresses !== undefined)
    };

    /**
     * Redirect to next page
     */
    const handleNext = (): void => {
        setHasValidationError(!areFieldsValid());
        if (areFieldsValid())
            navigate("/checkout/confirmation"); // programmatically redirect
    };

    /**
     * Redirect to previous page
     */
    const handlePrevious = () => {
        navigate("/cart", { state: location }); // programmatically redirect
    };

    return (
        <div className="container-page">

            <TextsStepper list={[
                { "name": t("steps.cart"), "current": false },
                { "name": t("steps.information"), "current": true },
                { "name": t("steps.confirmation"), "current": false },
                { "name": t("steps.payment"), "current": false },
                { "name": t("steps.success"), "current": false }
            ]} onClick={(index: number) => changeStep(index)}></TextsStepper>

            {isNotLogged() && <AnonymousProfile redirectTo="information" />}

            <div className="wrapper-checkout-information">

                <div className="wrapper-contact-user-data">
                    <UserContactInfo profile={profile}
                        expresionsRegular={expresionsRegularByDefault}
                        onChange={(profile: any, isVaslid: boolean) => handleChangeSomeField(profile, isVaslid)}
                    />
                </div>
                <div className="wrapper-delivery-address">
                    {canSelectAddress() && <>
                        <SelectAddress title={t("information.delivery.addres.title")}
                            country={getCurrentCountry()}
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

            {isProcessing && (
                <CircularProgress>{t('login.info.loading')}</CircularProgress>
            )}

            {hasError && <Alert severity="error">{t(msg)}</Alert>}
        </div>
    );
};

export default InformationPage;