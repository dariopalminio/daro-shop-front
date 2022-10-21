import { useState, useEffect } from 'react'
import * as GlobalConfig from 'infra/global.config';
import { IHookState, InitialState } from '../hook.type';
import { IPaymentClient } from 'domain/service/payment-client.interface';

/**
 * usePaymentManual Custom Hook
 */
export const usePayment = () => {
    const paymentClient: IPaymentClient = GlobalConfig.Factory.get<IPaymentClient>('paymentClient');
    const [state, setState] = useState<IHookState>(InitialState);
    const [ bankTransferInfo, setBankTransferInfo] = useState<Array<any>>([]);

    useEffect(() => {
    }, []);

    const getBankTransferInfo = async () => {
        
        const data = await paymentClient.getPaymentMethodInfo('BANK_TRANSFER');
        setBankTransferInfo(data.meta);
    };

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getBankTransferInfo,
        bankTransferInfo
    };
};