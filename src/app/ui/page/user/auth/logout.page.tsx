import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "domain/context/session.context";
import useLogout from "domain/hook/auth/logout.hook";
import { useTranslation } from 'react-i18next';
import Button from "app/ui/common/button/button";
import Alert from "app/ui/common/alert/alert";
import { CenteringContainer } from "app/ui/common/elements/centering-container";

/**
 * Login Function Component
 *
 * @visibleNa (Stateful/Container/Smart component)me Login View
 */
const LogoutPage: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;
  const { logout } = useLogout();
  const { t } = useTranslation();

  /**
   * Logout
   */
  const onClickLogoutHandler = (): void => {
    logout(session);
  };

  const isLogged = () => {
    return session && session.isLogged;
  };

  return (
    <div >
      {!isLogged() &&
        <Alert severity="success">
          {session?.userName}  {t('logout.success.already.logged')} {" "}
        </Alert>}

      <br />

      {isLogged() &&
        <CenteringContainer>
          <Button
            onClick={() => onClickLogoutHandler()}
          >
            {t('logout.command')}
          </Button>
        </CenteringContainer>
      }

    </div>
  );
};

export default LogoutPage;
