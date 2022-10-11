import { useState, useEffect } from 'react'
import { CartItemType } from 'domain/model/cart/cart-item.type';
import { AddressType } from 'domain/model/user/address.type';
import { Profile } from 'domain/model/user/profile.type';
import { initialEmptyProfile } from './profile.hook';

/**
 * Checkout Custom Hook
 */
export const useCheckout = () => {
    const [steps, setSteps] = useState<Array<any>>([]);
    const [addressToDelivery, setAddressToDelivery] = useState<AddressType | undefined>(undefined);
    const [profile, setProfile] = useState<Profile>(initialEmptyProfile); //puede colocarse en el hook

    useEffect(() => {
    }, []);

    return {
        steps,
        setSteps,
        addressToDelivery,
        setAddressToDelivery,
        profile, 
        setProfile
    };
};