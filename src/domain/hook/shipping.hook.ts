import { useState, useEffect, useContext } from 'react'
import { AddressType } from 'domain/model/user/address.type';
import { IShippingClient } from 'domain/service/shipping-client.interface';
import * as GlobalConfig from 'infra/global.config';
import { IHookState, InitialState } from './hook.type';
import { ApiError } from 'infra/client/api.error';
import SessionContext, { ISessionContext } from 'domain/context/session.context';

/**
 * Shipping Custom Hook
 */
export const useShipping = () => {
    const shippingClient: IShippingClient = GlobalConfig.Factory.get<IShippingClient>('shippingClient');
    const [state, setState] = useState<IHookState>(InitialState);
    const { session, removeSessionValue } = useContext(SessionContext) as ISessionContext;

    useEffect(() => {
    }, []);

    /**
     * Get Shipping Price
     * @param address 
     */
    const getShippingPrice = async (address: AddressType): Promise<any> => {

        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const data = await shippingClient.getShippingPrice(address);
            setState({ isProcessing: false, hasError: false, msg: "shipping.get.user.success", isSuccess: true });
            return data;
        } catch (error: any | ApiError) {
            let errorKey = error.message;
            console.log("ERROR:",error.message);
            if (error instanceof ApiError && (error.status === 400 || error.status === 401)) {
                errorKey = "auth.error.expired.token";
                removeSessionValue();
            }
            console.error(error);
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            return {};
        }
    };

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getShippingPrice
    };
};