import "./shopping-cart.css";
import { useTranslation } from "react-i18next";


interface Props {
    empty: boolean;
    count: number;
    subtotal: number;
    shipping: number;
    total: number;
    onClick: () => void;
    children?: React.ReactNode; //CartItem
}

/**
 * Cart
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
const ShoppingCart: React.FC<Props> = ({ empty, count, subtotal, onClick, children, shipping, total }) => {
    const { t } = useTranslation();

    return (
        <div className="shopping-cart-resume">

            <h1>{t('cart.confirmation')}</h1>

            <div className="shopping-cart-column-labels">
                <label className="shopping-cart-product-image">{t('cart.product')}</label>
                <label className="shopping-cart-product-details">{t('cart.name')}</label>
                <label className="shopping-cart-product-price">{t('cart.price')}</label>
                <label className="shopping-cart-product-quantity">{t('cart.quantity')}</label>
                <label className="shopping-cart-product-removal"></label>
                <label className="shopping-cart-product-line-price">{t('cart.amount')}</label>
            </div>

            {children}

            <div className="shopping-cart-totals">
                <div className="shopping-cart-totals-item">
                    <label>{t('cart.subtotal')}</label>
                    <div className="shopping-cart-totals-value" id="cart-subtotal">{subtotal}</div>
                </div>
                <div className="shopping-cart-totals-item">
                    <label>{t('cart.shipping')}</label>
                    <div className="shopping-cart-totals-value" id="cart-shipping">{shipping}</div>
                </div>
                <div className="shopping-cart-totals-item shopping-cart-totals-item-total">
                    <label>{t('cart.grandtotal')}</label>
                    <div className="shopping-cart-totals-value" id="cart-total">{total}</div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;