import { useState, useEffect, useContext } from 'react'
import { CartItemType } from 'domain/model/cart/cart-item.type';
import { AddressType } from 'domain/model/user/address.type';
import { Profile } from 'domain/model/user/profile.type';
import { initialEmptyProfile } from './profile.hook';
import { IShippingClient } from 'domain/service/shipping-client.interface';
import * as GlobalConfig from 'infra/global.config';
import { IHookState, InitialState } from './hook.type';
import { ApiError } from 'infra/client/api.error';
import SessionContext, { ISessionContext } from 'domain/context/session.context';

/**
 * Checkout Custom Hook
 */
export const useCheckout = () => {
    const shippingClient: IShippingClient = GlobalConfig.Factory.get<IShippingClient>('shippingClient');
    const [state, setState] = useState<IHookState>(InitialState);
    const { session, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [steps, setSteps] = useState<Array<any>>([]);
    const [addressToDelivery, setAddressToDelivery] = useState<AddressType | undefined>(undefined);
    const [profile, setProfile] = useState<Profile>(initialEmptyProfile); //puede colocarse en el hook
    const [currentSelectedAddresIndex, setCurrentSelectedAddresIndex] = useState(-1);
    const [profileInitialized, setProfileInitialized] = useState<boolean>(false); //puede colocarse en el hook
    const [shippingData, setShippingData] = useState<any>(undefined);

    useEffect(() => {
    }, []);

    const getShippingPrice = async (address: AddressType) => {

        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {

            let data = await shippingClient.getShippingPrice(address);

            setState({ isProcessing: false, hasError: false, msg: "shipping.get.user.success", isSuccess: true });
            setShippingData( data );

        } catch (error: any | ApiError) {
            let errorKey = error.message;
            if (error instanceof ApiError && (error.status === 400 || error.status === 401)) {
                errorKey = "auth.error.expired.token";
                removeSessionValue();
            }
            console.error(error);
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            throw error;
        }

    };

    return {
        steps,
        setSteps,
        profileInitialized,
        setProfileInitialized,
        currentSelectedAddresIndex,
        setCurrentSelectedAddresIndex,
        addressToDelivery,
        setAddressToDelivery,
        profile,
        setProfile,
        getShippingPrice,
        shippingData
    };
};