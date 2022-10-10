
import { FunctionComponent, useContext } from 'react'
import CartContext, { ICartContext } from "domain/context/cart.context";
import CartItem from "app/ui/component/cart/cart-item";
import Cart from "app/ui/component/cart/cart";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * CartPage
 * 
 * Pattern: Container Component, Conditional Rendering and Context Provider
 */
const CartPage: FunctionComponent = () => {
    const { cartItems,
        cartSubTotal,
        removeFromCart,
        getCartCount,
        changeItemQuantity } = useContext(CartContext) as ICartContext;
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    const getCartSubTotal = () => {
        return cartSubTotal;
    };

    const handleContinue = () => {
        if (getCartCount()>0)
            navigate("/checkout");
            else{
                alert("Tiene el carro vacío");
            }
    };

    return (
        <div className="container-page">
            <Link to="/">{t("back.to.home")}</Link>
            <Cart
                empty={cartItems.length === 0}
                count={getCartCount()}
                subtotal={getCartSubTotal()}
                onClick={handleContinue}
            >
                {cartItems.map((item, index) => (
                    <CartItem
                        key={item.id+index.toString()}
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