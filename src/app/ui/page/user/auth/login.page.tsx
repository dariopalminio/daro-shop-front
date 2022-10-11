import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "domain/context/session.context";
import { useTranslation } from 'react-i18next';
import Alert from "app/ui/common/alert/alert";
import useLogin from "domain/hook/auth/login.hook";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoginForm from "app/ui/component/user/auth/login-form";
import CircularProgress from "app/ui/common/progress/circular-progress";

/**
 * AuthPage for Login or Logout options
 * 
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Context Provider
 */
const LoginPage: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;
  const {
    isProcessing,
    hasError,
    msg,
    isSuccess,
    login,
  } = useLogin();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { redirectto } = useParams();


  const isLogged = () => {
    return session && session.isLogged;
  };

  const needToVerifyEmail = () => {
    return false //((session && session.isLogged) && !session.email_verified);
  };

  const redirectToPage = () => {
    console.log("redirectToPage:", redirectto);
    if (redirectto) navigate(`/${redirectto}`);
    else navigate('/');
  }

  /**
 * Login
 */
  const handleLoginSubmit = (email: string, password: string): void => {
    //e.preventDefault();
    login(email, password);
  };

  return (
    <>


      {!isSuccess && (
        <LoginForm onSubmit={(email: string, password: string) => handleLoginSubmit(email, password)}
          style={{ width: "300px", margin: "34px auto auto auto" }} />
      )}

      <br />

      {isProcessing && (
        <CircularProgress>{t('login.info.loading')}</CircularProgress>
      )}

      {hasError && <Alert severity="error">{t(msg)}</Alert>}

      {isSuccess &&
        redirectToPage()
      }

      {needToVerifyEmail() &&
        <Alert severity="warning">
          Warning: {t('auth.info.must.verify.email')}
          <br />{" "}
        </Alert>
      }

      {isLogged() && <Alert severity="info">{t('logout.success.already.logged')}</Alert>}


    </>
  );
};

export default LoginPage;