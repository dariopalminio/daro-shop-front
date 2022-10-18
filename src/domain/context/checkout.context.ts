import { addresEmpty } from 'domain/hook/address.hook';
import { initialEmptyProfile } from 'domain/hook/profile.hook';
import { AddressType } from 'domain/model/user/address.type';
import { Profile } from 'domain/model/user/profile.type';
import { createContext } from 'react';

export interface ICheckoutContext {
    profileInitialized: boolean;
    setProfileInitialized:  (initialized: boolean) => void;
    currentSelectedAddresIndex: number;
    setCurrentSelectedAddresIndex: (index: number) => void
    profile: Profile;
    setProfile:  (prof: Profile) => void;
    shippingData: any;
    setShippingPrice:  (data: any) => void;
    canContinueToPayment: () => boolean;
};

export const CheckoutContextDefaultValues: ICheckoutContext = {
    profileInitialized: false,
    setProfileInitialized:  (initialized: boolean) => { return false },
    currentSelectedAddresIndex: -1,
    setCurrentSelectedAddresIndex: (index: number) => { },
    profile: initialEmptyProfile, 
    setProfile:  (prof: Profile) =>  { },
    shippingData: undefined,
    setShippingPrice:  (data: any) => { },
    canContinueToPayment: () => { return false },
};

// Global Checkout context
const CheckoutContext = createContext<ICheckoutContext>(CheckoutContextDefaultValues);

export default CheckoutContext;