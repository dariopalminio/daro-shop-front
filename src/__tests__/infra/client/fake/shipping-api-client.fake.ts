
import { AddressType } from 'domain/model/user/address.type';
import { IShippingClient } from 'domain/service/shipping-client.interface';

/**
 * A stub for Profile http client thet may simulate the behavior of real impementation code and be a temporary substitute for this. 
 */
export default function ShippingClientStub(): IShippingClient {

//Stub function
function getShippingPrice(address: AddressType): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
        console.log("getProfile...................");
           const data: any = {
            "_id": "6316b3844c55dc07b0aac559",
            "price": "2900",
            "detail": "",

        };
           resolve(data);
     });
  };

return {
    getShippingPrice,
  
};
};
