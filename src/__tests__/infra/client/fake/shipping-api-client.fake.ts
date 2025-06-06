
import { AddressType } from 'domain/model/user/address.type';
import { IShippingClient } from 'domain/outgoing/shipping-client.interface';

/**
 * A stub for Shipping http client thet may simulate the behavior of real impementation code and be a temporary substitute for this. 
 */
export default function ShippingClientStub(): IShippingClient {

//Stub function
function getShippingPrice(address: AddressType): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
           const data: any = {
            "id": "6316b3844c55dc07b0aac559",
            "price": "2900",
            "money": "CMetropolitana",

        };
           resolve(data);
     });
  };

return {
    getShippingPrice,
  
};
};
