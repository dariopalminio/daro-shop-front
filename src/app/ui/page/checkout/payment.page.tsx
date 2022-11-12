
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PaymentMethods from 'app/ui/component/payment/payment-methods';
import { PreviousNextButtons, TextsStepper } from "daro-ui-kit";

export enum PaymentMethodType {
    BANK_TRANSFER = "BANK_TRANSFER",
    OTHER = "OTHER",
}

/**
 * PaymentPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
const PaymentPage: FunctionComponent = () => {


    const navigate = useNavigate();
    const { t } = useTranslation();
    const [payMethodName, setPayMethodName] = useState<string>(PaymentMethodType.BANK_TRANSFER);


    useEffect(() => {
        //send confirm order
    }, []);

    const changeStep = (index: number) => {
        if ((index === 0)) navigate("/cart", { state: location });
        if ((index === 1)) navigate("/checkout/information");
        if (index === 2) handlePrevious();
    }

    const handlePrevious = () => {
        navigate("/checkout/confirmation"); // programmatically redirect
    };

    const handleNext = (): void => {
        navigate("/checkout/success"); // programmatically redirect
    };

    return (
        <div className="container-page">

            <TextsStepper list={[
                { "name": t("steps.cart"), "current": false },
                { "name": t("steps.information"), "current": false },
                { "name": t("steps.confirmation"), "current": false },
                { "name": t("steps.payment"), "current": true },
                { "name": t("steps.success"), "current": false }
            ]} onClick={(index: number) => changeStep(index)}></TextsStepper>

            <h1>{t('checkout.payment.title')}</h1>

            <PaymentMethods select={payMethodName} onChange={(value: string) => setPayMethodName(value)} />

            <PreviousNextButtons labelPrevious={t('previous')} labelNext={t('checkout.button.pay')}
                handlePrevious={() => handlePrevious()} handleNext={() => handleNext()} />
        </div>
    );
};

export default PaymentPage;