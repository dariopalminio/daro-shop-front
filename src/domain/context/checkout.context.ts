import { addresEmpty } from 'domain/hook/address.hook';
import { initialEmptyProfile } from 'domain/hook/profile.hook';
import { AddressType } from 'domain/model/user/address.type';
import { Profile } from 'domain/model/user/profile.type';
import { createContext } from 'react';

export interface ICheckoutContext {
    steps: Array<any>;
    setSteps: (changedSteps: Array<any>) => void;
    currentSelectedAddresIndex: number;
    setCurrentSelectedAddresIndex: (index: number) => void
    addressToDelivery: AddressType | undefined;
    setAddressToDelivery: (addrs: AddressType) => void;
    profile: Profile;
    setProfile:  (prof: Profile) => void;
};

export const CheckoutContextDefaultValues: ICheckoutContext = {
    steps: [],
    setSteps: (changedSteps: Array<any>) => { },
    currentSelectedAddresIndex: -1,
    setCurrentSelectedAddresIndex: (index: number) => { },
    addressToDelivery: undefined,
    setAddressToDelivery: (addrs: AddressType) => { },
    profile: initialEmptyProfile, 
    setProfile:  (prof: Profile) =>  { }
};

// Global Checkout context
const CheckoutContext = createContext<ICheckoutContext>(CheckoutContextDefaultValues);

export default CheckoutContext;