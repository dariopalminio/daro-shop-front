import * as InfraConfig from 'infra/global.config';
import { handleAxiosError, ApiError } from 'infra/client/api.error';
import axiosInstance from './interceptor/axios.interceptor';
import { IShippingClient } from 'domain/service/shipping-client.interface';
import { AddressType } from 'domain/model/user/address.type';


export default function ShippingClientImpl(): IShippingClient {

    async function getShippingPrice(address: AddressType): Promise<any> {

        const URL = `${InfraConfig.APIEndpoints.shipping}/region/price`;
        console.log();
        const params = new URLSearchParams();
        params.append('region', address.state);

        const config = {
            params: params
        };

        try {
            const response = await axiosInstance.get(URL, config);

            console.log("ShippingClientImpl->response:", response);
            return response.data;
        } catch (err: any) {
            const authError: ApiError = handleAxiosError(err);
            throw authError;
        }
    };


    return {
        getShippingPrice
    };
};
