import { useState, useEffect, useContext } from 'react'
import { AddressType } from 'domain/model/user/address.type';
import { Profile } from 'domain/model/user/profile.type';
import { initialEmptyProfile } from './profile.hook';
import { IShippingClient } from 'domain/service/shipping-client.interface';
import * as GlobalConfig from 'infra/global.config';
import { IHookState, InitialState } from './hook.type';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import CartContext, { ICartContext } from 'domain/context/cart.context';


/**
 * Checkout Custom Hook
 */
export const useCheckout = () => {
    const [state, setState] = useState<IHookState>(InitialState);
    const { session, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const { cartItems,
        cartSubTotal,
        removeFromCart,
        getCartCount,
        changeItemQuantity, setCartShipping, cartShipping, cartTotal, calculateTotals } = useContext(CartContext) as ICartContext;
    const [profile, setProfile] = useState<Profile>(initialEmptyProfile); //puede colocarse en el hook
    const [currentSelectedAddresIndex, setCurrentSelectedAddresIndex] = useState(-1);
    const [profileInitialized, setProfileInitialized] = useState<boolean>(false); //puede colocarse en el hook
    const [shippingData, setShippingData] = useState<any>(undefined);

    useEffect(() => {
        console.log("useCheckout...");
    }, []);

    const setShippingPrice = (data: any) => {
        setShippingData(data);
        const shippingValue: number = Number(data.price);
        setCartShipping( shippingValue );
        calculateTotals();
    }

    const canContinueToPayment = (): boolean => {
        return cartTotal > 0;
    };

    return {
        profileInitialized,
        setProfileInitialized,
        currentSelectedAddresIndex,
        setCurrentSelectedAddresIndex,
        profile,
        setProfile,
        shippingData,
        setShippingPrice,
        canContinueToPayment
    };
};