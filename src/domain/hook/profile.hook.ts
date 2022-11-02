import { useContext, useState } from 'react';
import { ApiError } from 'infra/client/api.error';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import * as GlobalConfig from 'infra/global.config';
import { IProfileClient } from 'domain/outgoing/profile-client.interface';
import { IHookState, InitialState } from 'domain/hook/hook.type';
import { Profile } from 'domain/model/user/profile.type';
import { AddressType } from 'domain/model/user/address.type';

const initialNewAddress: AddressType = {
    street: '',
    department: '',
    neighborhood: '',
    city: '',
    state: '',
    country: ''
};

export const initialEmptyProfile: Profile = {
    userId: '',
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    docType: '',
    document: '',
    telephone: '',
    language: '',
    addresses: []
};

/**
 * use Profile
 * Custom hook
 * 
 * @returns 
 */
export default function useProfile() {

    const profileClient: IProfileClient = GlobalConfig.Factory.get<IProfileClient>('profileClient');
    const [state, setState] = useState<IHookState>(InitialState);
    const { session, removeSessionValue } = useContext(SessionContext) as ISessionContext;

    const getInitialProfile = () => {
        return initialEmptyProfile;
    }

    /**
     * Get Profile
     * @param userName 
     * @returns 
     */
    const getProfile = async (userName: string | undefined): Promise<Profile | null> => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        if (!session || !userName || userName == null) {
            setState({ isProcessing: false, hasError: true, msg: "auth.error.not.logged", isSuccess: false });
            return null;
        };

        try {

            let info: Profile = await profileClient.getProfile(userName);

            setState({ isProcessing: false, hasError: false, msg: "profile.get.user.success", isSuccess: true });
            return info;

        } catch (error: any | ApiError) {
            let errorKey = error.message;
            if (error instanceof ApiError && (error.status===400 || error.status===401)) {
                errorKey = "auth.error.expired.token";
                removeSessionValue();
            }
            console.error(error);
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            return null;
        }

    };

    /**
     * Update Profile
     * 
     * @param userProfile 
     * @returns 
     */
    const updateProfile = async (userProfile: any | undefined) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        if (!userProfile || userProfile == null) {
            setState({ isProcessing: false, hasError: true, msg: "profile.error.userProfile.empty", isSuccess: false });
            return;
        };

        try {

            let info = await profileClient.updateProfile(userProfile);
            setState({ isProcessing: false, hasError: false, msg: "profile.update.success", isSuccess: true });
            return;
        } catch (error: any | ApiError) {
            let errorKey = error.message;
            if (error instanceof ApiError && (error.status===400 || error.status===401)) {
                errorKey = 'auth.error.expired.token';
                removeSessionValue();
            }
            console.error(error);
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            throw error;
        }

    };

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getProfile,
        updateProfile,
        getInitialProfile
    };
};