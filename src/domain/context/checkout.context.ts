import { addresEmpty } from 'domain/hook/address.hook';
import { initialEmptyProfile } from 'domain/hook/profile.hook';
import { OrderType } from 'domain/model/order/order.type';
import { AddressType } from 'domain/model/user/address.type';
import { Profile } from 'domain/model/user/profile.type';
import { createContext } from 'react';

export interface ICheckoutContext {
    isProcessing: boolean;
    hasError: boolean;
    msg: string;
    isSuccess: boolean;
    profileInitialized: boolean;
    setProfileInitialized:  (initialized: boolean) => void;
    currentSelectedAddresIndex: number;
    setCurrentSelectedAddresIndex: (index: number) => void
    profile: Profile;
    setProfile:  (prof: Profile) => void;
    shippingData: any;
    setShippingPrice:  (data: any) => void;
    canContinueToPayment: () => boolean;
    initializeOrder: () => void;
    order: OrderType | undefined;
    includesShipping: boolean;
    SetIncludesShipping:  (isShipping: boolean) => void;
};

export const CheckoutContextDefaultValues: ICheckoutContext = {
    isProcessing: false,
    hasError: false,
    msg: '',
    isSuccess: false,
    profileInitialized: false,
    setProfileInitialized:  (initialized: boolean) => { return false },
    currentSelectedAddresIndex: -1,
    setCurrentSelectedAddresIndex: (index: number) => { },
    profile: initialEmptyProfile, 
    setProfile:  (prof: Profile) =>  { },
    shippingData: undefined,
    setShippingPrice:  (data: any) => { },
    canContinueToPayment: () => { return false },
    initializeOrder: () => { },
    order: undefined,
    includesShipping: true,
    SetIncludesShipping:   (isShipping: boolean) => { return true }
};

// Global Checkout context
const CheckoutContext = createContext<ICheckoutContext>(CheckoutContextDefaultValues);

export default CheckoutContext;