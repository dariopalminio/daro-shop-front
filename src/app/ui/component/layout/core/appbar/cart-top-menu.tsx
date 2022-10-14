import { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import IconButton from "app/ui/common/icon-button/icon-button";
import CartContext, { ICartContext } from "domain/context/cart.context";
import styled from "styled-components";

const CartCircle = styled.div`
  position: relative;
`;

const CartCount = styled.div`
  position: absolute;
  top: -7px;
  right: -5px;
  background: rgb(21, 201, 102);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2px;
  font-size: 10px;
`;

interface Props {
  style?: any;
}


/**
 * Cart Icon Button
 */
 const CartTopMenu: React.FC<Props> = (style) => {

  const { t } = useTranslation();
  const { getCartCount } = useContext(CartContext) as ICartContext; //Custom Hook
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Redirect to cart
   */
  const handleViewCart = () => {
    navigate("/cart", { state: location });
  };


  return (
    <IconButton
    onClick={handleViewCart}
    {...(style && {
      style: {style}
    })}
  >
    <CartCircle>
      <CartCount>{getCartCount()}</CartCount>
    </CartCircle>
    
    <RiShoppingCart2Fill size={20}/>

  </IconButton>
  );
};

export default CartTopMenu;
