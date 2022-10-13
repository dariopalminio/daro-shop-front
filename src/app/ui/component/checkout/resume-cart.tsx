import "./resume-cart.css";
import { useTranslation } from "react-i18next";
import styled from "styled-components";


interface Props {
    empty: boolean;
    count: number;
    subtotal: number;
    onClick: () => void;
    children?: React.ReactNode; //CartItem
}

/**
 * Cart
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
const ResumeCart: React.FC<Props> = ({ empty, count, subtotal, onClick, children }) => {
    const { t } = useTranslation();

    return (
        <div className="shopping-cart-resume">

            <div className="resume-column-labels">
                <label className="resume-product-image">{t('cart.product')}</label>
                <label className="resume-product-details">Nombre</label>
                <label className="resume-product-price">{t('cart.price')}</label>
                <label className="resume-product-quantity">{t('cart.quantity')}</label>
                <label className="resume-product-removal">Remove</label>
                <label className="resume-product-line-price">{t('cart.amount')}</label>
            </div>

            {children}

            <div className="totals">
                <div className="totals-item">
                    <label>Subtotal</label>
                    <div className="totals-value" id="cart-subtotal">71.97</div>
                </div>
                <div className="totals-item">
                    <label>Tax (5%)</label>
                    <div className="totals-value" id="cart-tax">3.60</div>
                </div>
                <div className="totals-item">
                    <label>Shipping</label>
                    <div className="totals-value" id="cart-shipping">15.00</div>
                </div>
                <div className="totals-item totals-item-total">
                    <label>Grand Total</label>
                    <div className="totals-value" id="cart-total">90.57</div>
                </div>
            </div>

        </div>
    );
};

export default ResumeCart;