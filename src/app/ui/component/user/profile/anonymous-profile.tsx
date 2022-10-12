import { FunctionComponent, MouseEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Paper from "app/ui/common/paper/paper";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    

    return (
        <div>
        <Paper style={{width: "400px", margin: "34px auto auto auto"}}>
            {t("profile.msg.anonymous")}

            &nbsp;&nbsp;
            <Link to={'/user/login'} state={location}>{t('login.command')}</Link>

            &nbsp;&nbsp;
            <Link to={'/user/register/form'} state={location}>{t('register.command.link')}</Link>

            <br/>
            
        </Paper>
        </div>
    );
};

export default AnonymousProfile;