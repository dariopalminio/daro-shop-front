import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import { SessionType } from 'domain/model/auth/session.type';
import * as StateConfig from 'infra/global.config';
import { IAuthClient } from 'domain/service/auth-client.interface';
import { IHookState, InitialState } from '../hook.type';

/**
 * use Logout 
 * 
 * Custom Hook
 * 
 * @returns 
 *      isLogged: Boolean
 *      hasLoginError: string
 *      msg: string
 *      login function
 *      logout function
 */
export default function useLogout() {
    const { removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState<IHookState>(InitialState);
    

    /**
     * logout function
     */
    const logout = (loggedUser: SessionType | undefined) => {
        setState({ isProcessing: true, hasError: false, msg: "logout.info.loading", isSuccess: false });
        removeSessionValue();
        setState({ isProcessing: false, hasError: false, msg: "logout.success", isSuccess: true });

    };

    return {
        isSuccess: state.isSuccess,
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        logout,
    };
};