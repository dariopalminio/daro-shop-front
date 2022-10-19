import { AddressType } from "../user/address.type";
import { ClientType } from "./client.type";
import { OrderItemType } from "./order-item.type";

export type OrderType = {
    _id: string; //_id: holds an ObjectId.

    client: ClientType;
    
    orderItems: OrderItemType[];

    includesShipping: boolean; //if is false then includes pick up in store
    shippingAddress: AddressType;

    subTotal: number; //subotal with VAT included
    shippingPrice: number;
    total: number; //total with VAT included

    status: string;

    createdAt?: Date;
    updatedAt?: Date;
};