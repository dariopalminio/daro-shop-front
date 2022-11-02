
import { AddressType } from "domain/model/user/address.type";

//Interface to do dependency inversion
export interface IShippingClient {
    getShippingPrice: (address: AddressType) => Promise<any>;
};