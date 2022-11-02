import * as InfraConfig from 'infra/global.config';
import { handleAxiosError, ApiError } from 'infra/client/api.error';
import axiosInstance from './interceptor/axios.interceptor';
import { AddressType } from 'domain/model/user/address.type';
import { IPaymentClient } from 'domain/outgoing/payment-client.interface';



export default function PaimentApiClientImpl(): IPaymentClient {

    /**
     * Get Shipping Price  
     * Get the delivery price according to an address
     * //http://localhost:3001/api/webshop/v1/payment/methods/key/BANK_TRANSFER
     * @returns 
     */
    async function getPaymentMethodInfo(key: string): Promise<any> {

        if (!key) throw Error("No payment method key selected");

        try {
            const URL = `${InfraConfig.APIEndpoints.payments}/methods/key/${key}`;

            const params = new URLSearchParams();
            params.append('key', key);

            const config = {
                params: params
            };

            const response = await axiosInstance.get(URL, config);

            console.log("getPaymentMethodInfo->response:", response);
            return response.data;
        } catch (err: any) {
            const authError: ApiError = handleAxiosError(err);
            throw authError;
        }
    };


    return {
        getPaymentMethodInfo
    };
};
