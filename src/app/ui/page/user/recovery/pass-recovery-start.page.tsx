import { FunctionComponent, useState } from "react";
import useRecovery from "domain/hook/auth/recovery.hook";
import { useTranslation } from 'react-i18next';
import PassRecoveryStartForm from "app/ui/component/user/recovery/pass-recovery-start-form";
import { useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "oaky-ui-kit";

/**
 * Pass Recovery Start Page (Password recovery STEP 1)
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Context Provider
 */
const PassRecoveryStartPage: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const { isProcessing, isSuccess, hasError, msg, sendEmailToRecovery } = useRecovery();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const errorText = {
    email: t('register.email.invalid')
  };

  /**
  * Submit
  */
  const handleSubmit = () => {
    console.log("handleSubmit");
    sendEmailToRecovery(email, i18n.language); //send to server
  };

  const redirect = () => {
    navigate("/user/recovery/msg");
  }

  return (
    <>

      {isSuccess && redirect()}

      <PassRecoveryStartForm
        email={email}
        title={t('recovery.start.title')}
        message={t('recovery.start.info.enter.email')}
        validationErrorMessages={errorText}
        onChange={(emailValue: string) => setEmail(emailValue)}
        onSubmit={() => handleSubmit()} 
        style={{width: "300px", margin: "34px auto auto auto"}}
        />

      {isProcessing && <Alert severity="info">{t(msg)}</Alert>}

      {isProcessing && (<CircularProgress />)}

      {hasError && <Alert severity="error">{t(msg)}</Alert>}

      <br />

    </>
  );
};

export default PassRecoveryStartPage;