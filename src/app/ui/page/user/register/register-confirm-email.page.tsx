import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import emailOkImage from "app/ui/image/email_ok.png";
import useRegister from "domain/hook/auth/register.hook";
import { Alert, CircularProgress } from "oaky-ui-kit";

//type TParams = { token: string }; //match.params.token

/**
 * Register Confirm Email Page (Register STEP 3)
 * This page receives a 'token' parameter and passes it to the child component.
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Custom hook
 */
function RegisterConfirmEmailPage() {

  const [isExecuted, setIsExecuted] = useState(false);
  const { isProcessing, isSuccess, hasError, msg, confirmAccount } = useRegister();
  const { t, i18n } = useTranslation();
  //const params = useParams();
  const { token } = useParams();

  useEffect(() => {
    console.log("RegisterConfirmEmailPage-->useEffect");
  }, []);
  
  const executeConfirmRequest = () => {
    setIsExecuted(true);
    confirmAccount(token? token : '', i18n.language);
  };

  return (
    <>
      {!isExecuted && executeConfirmRequest()}

      {isProcessing && (
        <CircularProgress />
      )}

      {(isSuccess && !isProcessing) &&
        (<div>
          <img src={String(emailOkImage)} alt="emailOkImage" style={{ width: "25%", height: "25%" }} />
          <Alert severity="success">{t(msg)}</Alert>
        </div>
        )
      }

      {(!isSuccess && !isProcessing && hasError) && <Alert severity="error">{t(msg)}</Alert>}
    </>
  );
};

export default RegisterConfirmEmailPage;