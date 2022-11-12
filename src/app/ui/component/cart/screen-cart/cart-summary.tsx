import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "daro-ui-kit";

const CartSummaryContainer = styled.div`
    flex: 0.3;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    height: fit-content;
    border-radius: 5px;
    margin-top: 1rem;
    div {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding: 1rem;
    }
    div:last-child {
        border: none;
    }
    div button {
        width: 100%;
    }

    .shopping_cart_info p {
        padding: 4px;
      }
      
    .shopping_cart_info p:first-child {
        font-weight: bold;
      }
`;

const CartSummaryInfo = styled.div`
    padding: 4px;
    p:first-child {
        font-weight: bold;
      }
`;


interface IProps {
    readOnly?: boolean;
    money: string;
    count: number;
    subtotal: number;
    shipping?: number;
    total?: number;
    onClick?: () => void;
    children?: React.ReactNode; //CartItem
}

/**
 * CartSummary
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
const CartSummary: React.FC<IProps> = (props: IProps) => {
    const { t } = useTranslation();

    const handleClick = () => {
        if (props.onClick) props.onClick();
    }

    return (
        <CartSummaryContainer>
            <CartSummaryInfo>
                <p>{t('cart.you.have')} ({props.count}) {t('cart.products')}</p>
                <p>{t('cart.subtotal')}: ({props.money}) $ {props.subtotal}</p>
                {(props.shipping && props.shipping !==-1) && 
                    <p>{t('cart.shipping')}: ({props.money}) $ {props.shipping}</p>}
                {props.total && <p>{t('cart.grandtotal')}: ({props.money}) $ {props.total}</p>}
            </CartSummaryInfo>
            {!props.readOnly &&
            <div>
                <Button
                    onClick={()=>handleClick()}>
                    {t('cart.button.checkout')}
                </Button>
            </div>
            }
        </CartSummaryContainer>
    );
};

export default CartSummary;