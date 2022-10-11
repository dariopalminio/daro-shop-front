import { FunctionComponent, MouseEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Paper from "app/ui/common/paper/paper";
import { useLocation, useNavigate } from "react-router-dom";

interface MyProps {
    redirectTo: string;
}

/**
 * Anonymous Profile
 */
const AnonymousProfile: FunctionComponent<MyProps> = ({redirectTo}) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    
    const redirectToLogin = ()=>{
        //e.preventDefault();
        //navigate("/user/login", { state: { from: location } });
        navigate({
            pathname: '/user/login/'+redirectTo,
          });
    }

    return (
        <div>
        <Paper style={{width: "400px", margin: "34px auto auto auto"}}>
            {t("profile.msg.anonymous")}

            &nbsp;&nbsp;
            <a href="#" onClick={() => redirectToLogin()}>
                {t('login.command')}
            </a>
            &nbsp;&nbsp;
            <a href="#">
                {t('register.command.link')}
            </a>

            <br/>
            
        </Paper>
        </div>
    );
};

export default AnonymousProfile;