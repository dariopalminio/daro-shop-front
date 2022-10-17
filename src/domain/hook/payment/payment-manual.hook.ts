import { useState, useEffect, useContext } from 'react'
import { AddressType } from 'domain/model/user/address.type';
import { IShippingClient } from 'domain/service/shipping-client.interface';
import * as GlobalConfig from 'infra/global.config';
import { IHookState, InitialState } from '../hook.type';
import { ApiError } from 'infra/client/api.error';
import SessionContext, { ISessionContext } from 'domain/context/session.context';

const ifoManualPayment: Array<any> = [
    {
        label: "Nombre",
        text: "COMERCIO EXAMPLE SPA"
    },
    {
        label: "Rut Empresa",
        text: "77.887.987-1"
    },
    {
        label: "Cuenta N°",
        text: "00-123-1234-12"
    },
    {
        label: "Banco",
        text: "Banco Chile"
    },
    {
        label: "Tipo Cuenta",
        text: "Cuenta Corriente"
    },
    {
        label: "Email",
        text: "pay@myemma.cl"
    },
];

/**
 * usePaymentManual Custom Hook
 */
export const usePaymentManual = () => {
    //const paymentClient: IPaymentClient = GlobalConfig.Factory.get<IPaymentClient>('paymentClient');
    const [state, setState] = useState<IHookState>(InitialState);
    const [ bankTransferInfo, setBankTransferInfo] = useState<Array<any>>([]);

    useEffect(() => {
    }, []);

    const getBankTransferInfo = async () => {
        setBankTransferInfo(ifoManualPayment);
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