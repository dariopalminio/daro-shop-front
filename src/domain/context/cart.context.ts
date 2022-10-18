import { createContext } from 'react';
import { ProductType } from 'domain/model/product/product.type';

export interface ICartContext {
    cartItems: Array<any>
    cartSubTotal: number
    setCartItems: (newCartItems: Array<any>) => void
    setCartSubTotal: (newSubTotal: number) => void
    addToCart: (item: ProductType, qty: number) => void
    removeFromCart: (id: string) => void
    getCartCount: () => number
    changeItemQuantity: (id: string, qty: number) => void,
    cartShipping: number,
    setCartShipping: (newTotal: number) => void,
    cartTotal: number,
    calculateTotals: () => void,
    getMoney: () => string
};

export const CartContextDefaultValues: ICartContext = {
    cartItems: [],
    cartSubTotal: 0,
    setCartItems: (newCartItems: Array<any>) => { },
    setCartSubTotal: (newSubTotal: number) => { },
    addToCart: (item: ProductType, qty: number) => { },
    removeFromCart: (id: string) => { },
    getCartCount: () => 0,
    changeItemQuantity: (id: string, qty: number) => { },
    cartShipping:  0,
    setCartShipping: (newTotal: number) => { },
    cartTotal: 0,
    calculateTotals: () => { },
    getMoney: () => { return '' }
};

// Global cart context
const CartContext = createContext<ICartContext>(CartContextDefaultValues);

export default CartContext;
