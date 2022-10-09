import { FC } from "react";
import CartContext from "domain/context/cart.context";
import { useCart } from "domain/hook/cart.hook";

interface Props {children?: React.ReactNode}

/**
 * Cart Context Provider
 */
const CartContextProvider: FC<Props> = ({ children }) => {
    const {
        cartItems,
        cartSubTotal,
        setCartItems,
        setCartSubTotal,
        addToCart,
        removeFromCart,
        getCartCount,
        changeItemQuantity
    } = useCart();

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartSubTotal,
                setCartItems,
                setCartSubTotal,
                addToCart,
                removeFromCart,
                getCartCount,
                changeItemQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
