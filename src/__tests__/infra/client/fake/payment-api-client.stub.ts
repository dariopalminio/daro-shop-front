import { IPaymentClient } from 'domain/outgoing/payment-client.interface';

/**
 * A stub for Profile http client thet may simulate the behavior of real impementation code and be a temporary substitute for this. 
 */
export default function PaymentClientStub(): IPaymentClient {

//Stub function tu get http://localhost:3001/api/webshop/v1/payment/methods/key/BANK_TRANSFER
function getPaymentMethodInfo(key: string): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
           const data: any = {
            "id": "6351fc7a004c27fe61a552d1",
            "key": "BANK_TRANSFER",
            "name": "Transferencia",
            "description": "Transferencia Bancaria Manual",
            "image": "pay_method_transfer_bank.png",
            "active": true,
            "meta": [
                {
                    "label": "Nombre",
                    "value": "COMERCIO EXAMPLE SPA"
                },
                {
                    "label": "Rut Empresa",
                    "value": "77.887.987-1"
                },
                {
                    "label": "Cuenta N°",
                    "value": "00-123-1234-12"
                },
                {
                    "label": "Banco",
                    "value": "Banco Chile"
                },
                {
                    "label": "Tipo Cuenta",
                    "value": "Cuenta Corriente"
                },
                {
                    "label": "Email",
                    "value": "pay@myemma.cl"
                }
            ],
            "createdAt": "2022-10-21T01:57:09.715Z",
            "updatedAt": "2022-10-21T01:57:09.715Z",
            "__v": 0
        };
           resolve(data);
     });
  };


return {
    getPaymentMethodInfo
};
};
