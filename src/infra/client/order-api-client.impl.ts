import * as InfraConfig from 'infra/global.config';
import { handleAxiosError, ApiError } from 'infra/client/api.error';
import axiosInstance from './interceptor/axios.interceptor';
import { IShippingClient } from 'domain/outgoing/shipping-client.interface';
import { AddressType } from 'domain/model/user/address.type';
import { IOrderClient } from 'domain/outgoing/order-client.interface';
import { OrderType } from 'domain/model/order/order.type';



export default function OrderApiClientImpl(): IOrderClient {

    //post http://localhost:3001/api/webshop/v1/orders/initialize
    async function initialize(order: OrderType): Promise<any> {
        console.log("Order to initialize:", order);
        try {
            //User endpoint
            const URL = `${InfraConfig.APIEndpoints.orders}/initialize`;

            const response = await axiosInstance({
                method: 'post',
                url: URL,
                headers: {},
                data: order
            });

            return response.data;
        } catch (error: any) {
            // response.status !== 200
            const authError: ApiError = handleAxiosError(error);
            throw authError;
        }
    };

    return {
        initialize,
    };
};
