import "./shopping-cart.css";
import { useTranslation } from "react-i18next";
import { OrderType } from "domain/model/order/order.type";


interface IProps {
    order: OrderType;
    money: string;
    onClick: () => void;
    children?: React.ReactNode; //CartItem
}

/**
 * Cart
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
const ShoppingCart: React.FC<IProps> = (props: IProps) => {
    const { t } = useTranslation();

    return (
        <div className="shopping-cart-resume">

            <div className="shopping-cart-column-labels">
                <label className="shopping-cart-product-image">{t('cart.product')}</label>
                <label className="shopping-cart-product-details">{t('cart.name')}</label>
                <label className="shopping-cart-product-price">{t('cart.price')}</label>
                <label className="shopping-cart-product-quantity">{t('cart.quantity')}</label>
                <label className="shopping-cart-product-removal"></label>
                <label className="shopping-cart-product-line-price">{t('cart.amount')}&nbsp;&nbsp;</label>
            </div>

            {props.children}

            <div className="shopping-cart-totals">
                <div className="shopping-cart-totals-item">
                    <label>{t('cart.subtotal')}</label>
                    <div className="shopping-cart-totals-value" id="cart-subtotal">$ {props.order.subTotal}</div>
                </div>
                <div className="shopping-cart-totals-item">
                    <label>{t('cart.shipping')}</label>
                    <div className="shopping-cart-totals-value" id="cart-shipping">$ {props.order.shippingPrice}</div>
                </div>
                <div className="shopping-cart-totals-item shopping-cart-totals-item-total">
                    <label>{t('cart.grandtotal')}</label>
                    <div className="shopping-cart-totals-value" id="cart-total">({props.money}) $ {props.order.total}</div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;