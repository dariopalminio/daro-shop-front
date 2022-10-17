import * as InfraConfig from 'infra/global.config';
import { handleAxiosError, ApiError } from 'infra/client/api.error';
import axiosInstance from './interceptor/axios.interceptor';
import { IShippingClient } from 'domain/service/shipping-client.interface';
import { AddressType } from 'domain/model/user/address.type';



export default function ShippingClientImpl(): IShippingClient {

    async function getShippingPrice(address: AddressType): Promise<any> {

        if (!address) throw Error("checkout.shipping.address.error");

        const URL = `${InfraConfig.APIEndpoints.shipping}/price/address`;
        console.log();
        const params = new URLSearchParams();
        params.append('country', address.country);
        params.append('state', address.state);
        params.append('neighborhood', address.neighborhood);
        params.append('city', address.city);

        const config = {
            params: params
        };

        try {
            const response = await axiosInstance.get(URL, config);

            console.log("ShippingClientImpl->response:", response);
            return response.data;
        } catch (err: any) {
            const authError: ApiError = handleAxiosError(err);
            if (authError.status === 404)
                throw new ApiError('checkout.shipping.address.error.not.found', err.stack, 404, 'Not found');
            throw authError;
        }
    };


    return {
        getShippingPrice
    };
};
