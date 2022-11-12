import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "domain/context/session.context";
import { useTranslation } from 'react-i18next';
import useLogin from "domain/hook/auth/login.hook";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoginForm from "app/ui/component/user/auth/login-form";
import { CircularProgress, Alert } from "daro-ui-kit";

/**
 * Login Page for Login or Logout options
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
  const { t } = useTranslation();
  const location = useLocation();

  const isLogged = () => {
    return session && session.isLogged;
  };

  const needToVerifyEmail = () => {
    return false //((session && session.isLogged) && !session.email_verified);
  };

  /** 
   * Retrieves the pathname entered in the state for the last link using location.
   * The pathname will be used to redirect after login success
   */
  const getPathname = () => {
    const pathname = location?.state?.pathname ? location.state.pathname : "/";
    return pathname;
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
        <Navigate to={getPathname()} />
      }

      {needToVerifyEmail() &&
        <Alert severity="warning">
          {t('auth.info.must.verify.email')}
          <br />{" "}
        </Alert>
      }

      {isLogged() && <Alert severity="info">{t('logout.success.already.logged')}</Alert>}
    </>
  );
};

export default LoginPage;