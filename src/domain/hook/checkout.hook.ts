import { useState, useEffect } from 'react'
import { CartItemType } from 'domain/model/cart/cart-item.type';



/**
 * Checkout Custom Hook
 */
export const useCheckout = () => {
    const [steps, setSteps] = useState<Array<any>>([]);

    useEffect(() => {
    }, []);

    return {
        steps,
        setSteps
    };
};