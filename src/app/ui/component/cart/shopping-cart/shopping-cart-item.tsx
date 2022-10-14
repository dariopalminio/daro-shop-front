
import "./shopping-cart.css";
import { Link } from "react-router-dom";
import ButtonQuantity from "app/ui/common/button-quantity/button-quantity";
import { CartItemType } from "domain/model/cart/cart-item.type";
import styled from "styled-components";
import { RiDeleteBin7Fill } from "react-icons/ri";
import IconButton from "app/ui/common/icon-button/icon-button";
import { useRef } from "react";


interface IProps {
  item: CartItemType;
  qtyChangeHandler: (id: string, qty: number) => void;
  removeHandler: (id: string) => void;
}

/**
 * CartItem
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
const ShoppingCartItem: React.FC<IProps> = (props: IProps) => {


  const handlerChanfeInputQty = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue: number = parseInt(e.currentTarget.value);
    props.qtyChangeHandler(props.item.itemId, newValue);
    
  };

  return (
    <div className="shopping-cart-product">
      <div className="shopping-cart-product-image">
        <img src={props.item.imageUrl} alt={props.item.name} width="50px" height="50px" />
      </div>
      <div className="shopping-cart-product-details">
        <div className="shopping-cart-product-title">
          <Link
            to={`/catalog/product/detail/${props.item.productId}`} >
            <p>{props.item.name}</p>
          </Link>
        </div>

      </div>
      <div className="shopping-cart-product-price">{props.item.grossPrice}</div>
      <div className="shopping-cart-product-quantity">
        <input  type="number" defaultValue={props.item.qty} min="1" onChange={(e) => handlerChanfeInputQty(e)} />
      </div>
      <div className="shopping-cart-product-removal">
        <IconButton
          onClick={() => props.removeHandler(props.item.itemId)}>
          <RiDeleteBin7Fill size={20} color="grey" onClick={() => props.removeHandler(props.item.itemId)} />
        </IconButton>
      </div>
      <div className="shopping-cart-product-amount">{props.item.amount}</div>
    </div>
  );
};

export default ShoppingCartItem;