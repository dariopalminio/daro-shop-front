
import { OrderType } from 'domain/model/order/order.type';
import { AddressType } from 'domain/model/user/address.type';
import { IOrderClient } from 'domain/service/order-client.interface';

const responseInitialized: any = {
    "message": "Order Initialized Successfully",
    "order": {
        "client": {
            "userId": "ANONYMOUS",
            "firstName": "ANONYMOUS",
            "lastName": "ANONYMOUS",
            "email": "ANONYMOUS@gmail.com",
            "docType": "",
            "document": "",
            "telephone": ""
        },
        "orderItems": [
            {
                "itemId": "0",
                "productId": "634ccc200dcc68cbdecd0363",
                "imageUrl": "https://i.pinimg.com/originals/95/5d/e2/955de20dd2d6f457a1cfdadb8edc23d4.png",
                "name": "Magic unicorn toy",
                "grossPrice": 1190,
                "qty": 1,
                "amount": 1190
            },
            {
                "itemId": "1",
                "productId": "634ccc400dcc68cbdecd0366",
                "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2SmahEEhWXut-9211CpUtZLrOljU8BfdnBUlt60UwBVemJ0rXC3T9-SEuMAfH6ttUmMg&usqp=CAU",
                "name": "HIDON-Chalecon",
                "grossPrice": 650000,
                "qty": 1,
                "amount": 650000
            }
        ],
        "includesShipping": true,
        "shippingAddress": {
            "street": "Galvarino Gallardo 1750",
            "department": "1001",
            "neighborhood": "Providencia",
            "city": "Santiago",
            "state": "Metropolitana",
            "country": "Chile"
        },
        "subTotal": 651190,
        "shippingPrice": 2950,
        "total": 654140,
        "status": "INITIALIZED",
        "createdAt": "2022-10-19T04:38:23.370Z",
        "updatedAt": "2022-10-19T04:38:23.370Z",
        "_id": "634f7f4c6139943efbf78db4",
        "__v": 0
    }
};

export default function OrderClientStub(): IOrderClient {

//Stub function
function initialize(order: OrderType): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
           const data: any = responseInitialized;
           resolve(data);
     });
  };

return {
    initialize,
};
};