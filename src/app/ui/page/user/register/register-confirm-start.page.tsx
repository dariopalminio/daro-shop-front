import {
  FunctionComponent,
  useContext,
  useEffect
} from "react";
import SessionContext, {
  ISessionContext,
} from "domain/context/session.context";
import useRegister from "domain/hook/auth/register.hook";
import { useTranslation } from 'react-i18next';
import RegisterConfirmStart from "app/ui/component/user/register/register-confirm-start";
import { useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "oaky-ui-kit";

/**
 * Register Confirm Start Page (Register STEP 2)
 * Pague to send email with verification link.
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Custom hook
 */
const RegisterConfirmStartPage: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("RegisterConfirmStartPage-->useEffect");
  }, []);

  const {
    isProcessing,
    hasError,
    msg,
    isSuccess,
    startConfirmEmail,
  } = useRegister();

  /**
   * Handle send email with verification link.
   */
  const handleSendEmail = async () => {
    const userName = session ? session.userName : "";
    const userEmail = session ? session.email : undefined;
    startConfirmEmail(userName, userEmail, i18n.language); //send to server
  };

  const redirect = () => {
    navigate("/user/auth");
  }

  return (
    <>
      {isSuccess && redirect()}

      <RegisterConfirmStart
        successMsg={t('register.start.success.temporarily.created')}
        message={t('register.start.title.email.verirication')}
        onClick={() => handleSendEmail()}
        style={{ width: "300px", margin: "34px auto auto auto" }}
      />

      {hasError && <Alert severity="error">{t(msg)}</Alert>}

      {isProcessing && <Alert severity="info">{t(msg)}</Alert>}

      {isProcessing && (<CircularProgress />)}

    </>
  );
};

export default RegisterConfirmStartPage;