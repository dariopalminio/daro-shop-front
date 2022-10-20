
import { FunctionComponent, useContext } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import CartItem from "app/ui/component/cart/screen-cart/cart-item";
import Cart from "app/ui/component/cart/screen-cart/cart";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * CartPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
const CartPage: FunctionComponent = () => {
    const { cartItems, cartSubTotal, removeFromCart, getCartCount,
        changeItemQuantity, getMoney } = useContext(CartContext) as ICartContext; //With custom hook
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const getCartSubTotal = () => {
        return cartSubTotal;
    };

    const handleContinue = () => {
        if (getCartCount() > 0)
            navigate("/checkout/information");
        else {
            alert(t('cart.empty')); //it need styles in custom component
        }
    };

    /** 
     * Retrieves the pathname entered in the state for the last link using location.
     * The pathname will be used to redirect after login success
     */
    const getPathToComeback = () => {
        const pathname = location?.state?.pathname ? location.state.pathname : "/";
        return pathname;
    }

    return (
        <div className="container-page">

            <Link to={getPathToComeback()}>{t("back.to.previous")}</Link>

            <Cart
                money={getMoney()}
                empty={cartItems.length === 0}
                count={getCartCount()}
                subtotal={getCartSubTotal()}
                onClick={handleContinue}
            >
                {cartItems.map((item, index) => (
                    <CartItem
                        key={index}
                        item={item}
                        qtyChangeHandler={changeItemQuantity}
                        removeHandler={removeFromCart}
                    />
                ))}

            </Cart>
        </div>
    );
};

export default CartPage;