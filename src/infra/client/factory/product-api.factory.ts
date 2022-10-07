
import { IProductClient } from '../../../domain/service/product-client.interface';
import ProductApiClientImpl from '../product-api-client.impl';
import ProductClientFake from '../stub/product-api-client.fake';

/**
 * Factory of INotificationService implementation for dependency injection
 */
export class ProductApiClientFactory {
    static create(fake: boolean): IProductClient{
        //Return a factory function
        if (fake) return ProductClientFake(); //fake for test
        return ProductApiClientImpl(); //Real api
    }
};
