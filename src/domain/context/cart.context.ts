import { createContext } from 'react';
import { ProductType } from 'domain/model/product/product.type';

export interface ICartContext {
    cartItems: Array<any>
    cartSubTotal: number
    setCartItems: (newCartItems: Array<any>) => void
    setCartSubTotal: (newTotal: number) => void
    addToCart: (item: ProductType, qty: number) => void
    removeFromCart: (id: string) => void
    getCartCount: () => number
    changeItemQuantity: (id: string, qty: number) => void
};

export const CartContextDefaultValues: ICartContext = {
    cartItems: [],
    cartSubTotal: 0,
    setCartItems: (newCartItems: Array<any>) => { },
    setCartSubTotal: (newTotal: number) => { },
    addToCart: (item: ProductType, qty: number) => { },
    removeFromCart: (id: string) => { },
    getCartCount: () => 0,
    changeItemQuantity: (id: string, qty: number) => { }
};

// Global cart context
const CartContext = createContext<ICartContext>(CartContextDefaultValues);

export default CartContext;
