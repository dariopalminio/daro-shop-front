import { useState, useEffect, useContext } from 'react'
import { AddressType } from 'domain/model/user/address.type';
import { Profile } from 'domain/model/user/profile.type';
import { initialEmptyProfile } from './profile.hook';
import { IShippingClient } from 'domain/service/shipping-client.interface';
import * as GlobalConfig from 'infra/global.config';
import { IHookState, InitialState } from './hook.type';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import CartContext, { ICartContext } from 'domain/context/cart.context';
import { IOrderClient } from 'domain/service/order-client.interface';
import { OrderType } from 'domain/model/order/order.type';


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
    const orderClient: IOrderClient = GlobalConfig.Factory.get<IOrderClient>('orderClient');
    const [order, setOrder] = useState<OrderType | undefined>(undefined);
    const [includesShipping, SetIncludesShipping] = useState<boolean>(true);

    useEffect(() => {
        console.log("useCheckout...");
    }, []);

    const setShippingPrice = (data: any) => {
        const shippingValue: number = Number(data.price);
        setCartShipping(shippingValue);
        setShippingData(data);
    }

    const canContinueToPayment = (): boolean => {
        return cartTotal > 0;
    };

    const initializeOrder = async () => {

        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const orderToInit: OrderType = {
                client: {
                    userId: profile.userId ? profile.userId : 'Anonymous',
                    firstName: profile.userId ? profile.userId : 'Anonymous',
                    lastName: profile.lastName ? profile.lastName : 'Anonymous',
                    email: profile.lastName,
                    docType: profile.docType ? profile.docType : '',
                    document: profile.document ? profile.document : '',
                    telephone: profile.telephone ? profile.telephone : '',
                },
                count: getCartCount(),
                orderItems: cartItems,
                includesShipping: includesShipping,
                shippingAddress: profile.addresses[currentSelectedAddresIndex],
                subTotal: cartSubTotal,
                shippingPrice: cartShipping,
                total: cartTotal
            }

            const newOrder: any = await orderClient.initialize(orderToInit);
            setOrder(newOrder.order);
            setState({ isProcessing: false, hasError: false, msg: '', isSuccess: true });
        } catch (error: any) {
            setState({ isProcessing: false, hasError: true, msg: error.message, isSuccess: false });
        }
    }

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        profileInitialized,
        setProfileInitialized,
        currentSelectedAddresIndex,
        setCurrentSelectedAddresIndex,
        profile,
        setProfile,
        shippingData,
        setShippingPrice,
        canContinueToPayment,
        initializeOrder,
        order,
        includesShipping,
        SetIncludesShipping
    };
};