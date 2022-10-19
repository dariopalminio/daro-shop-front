
import { OrderType } from "domain/model/order/order.type";

//Interface to do dependency inversion
export interface IOrderClient {
    initialize: (order: OrderType) => Promise<any>;
};