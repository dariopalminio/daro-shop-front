import { IAuthClient } from "domain/service/auth-client.interface";
import { IAuthTokensClient } from "domain/service/auth-tokens-client.interface";
import { INotificationClient } from "domain/service/notification-client.interface";
import { IProductClient } from "domain/service/product-client.interface";
import { IProfileClient } from "domain/service/profile-client.interface";
import { IPaymentClient } from "domain/service/payment-client.interface";
import { IOrderClient } from "domain/service/order-client.interface";
import { IShippingClient } from "domain/service/shipping-client.interface";

//Imports real implementations
import ApiAuthClientImpl from "./client/api-auth-client.impl";
import AuthTokensClientImpl from "./client/auth-tokens-client.impl";
import ProductApiClientImpl from "./client/product-api-client.impl";
import ProfileApiClientImpl from "./client/profile-api-client.impl";
import NotificationApiServiceImpl from "./client/notification-api-client.impl";
import ShippingClientImpl from "./client/shipping-api-client.impl";

//Imports fakes (Mocks and stubs) for app simulation 
import ApiAuthClientStub from "../__tests__/infra/client/fake/api-auth-client.stub";
import AuthTokensClientOktub from "../__tests__/infra/client/fake/auth-token-client-ok.stub";
import NotificationClientStub from "../__tests__/infra/client/fake/notification-api-client.stub";
import ProductClientFake from "../__tests__/infra/client/fake/product-api-client.fake";
import ProfileClientStub from "../__tests__/infra/client/fake/profile-api-client.stub";
import ShippingClientStub from "../__tests__/infra/client/fake/shipping-api-client.fake";
import OrderClientStub from "../__tests__/infra/client/fake/order-api-client.stub";
import PaymentClientStub from "../__tests__/infra/client/fake/payment-api-client.stub";



/**
 * Global Factory for dependency injection
 * This is used to inversion of control (IoC). 
 * A IoC container is used to identify and inject its dependencies using functional programming.
 * @returns 
 */
export default function GlobalFactory() {

    const container: Map<string, any> = new Map();

    const is_fake_mode = ((import.meta.env.VITE_FE_FAKE === 'true') ? true : false) as boolean;

    if (is_fake_mode) {
        /** Instances for injection of fakes for app simulation */
        container.set('productClient', ProductClientFake() as IProductClient);
        container.set('authClient', ApiAuthClientStub() as IAuthClient);
        container.set('authTokensClient', AuthTokensClientOktub() as IAuthTokensClient);
        container.set('profileClient', ProfileClientStub() as IProfileClient);
        container.set('notificationClient', NotificationClientStub() as INotificationClient);
        container.set('shippingClient', ShippingClientStub() as IShippingClient);
        container.set('orderClient', OrderClientStub() as IOrderClient);
        container.set('paymentClient', PaymentClientStub() as IPaymentClient);

    } else {
        /** Instances for injection of the real */
        container.set('productClient', ProductApiClientImpl() as IProductClient);
        container.set('authClient', ApiAuthClientImpl() as IAuthClient);
        container.set('authTokensClient', AuthTokensClientImpl() as IAuthTokensClient);
        container.set('profileClient', ProfileApiClientImpl() as IProfileClient);
        container.set('notificationClient', NotificationApiServiceImpl() as INotificationClient);
        container.set('shippingClient', ShippingClientImpl() as IShippingClient);
    }

    //Get instance for key name
    const get = <R>(key: string): R => {
        return container.get(key) as R;
    };

    return {
        get
    };
};

