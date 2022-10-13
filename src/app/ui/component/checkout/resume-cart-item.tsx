
import "./resume-cart.css";
import { Link } from "react-router-dom";
import ButtonQuantity from "app/ui/common/button-quantity/button-quantity";
import { CartItemType } from "domain/model/cart/cart-item.type";
import styled from "styled-components";
import { RiDeleteBin7Fill } from "react-icons/ri";
import IconButton from "app/ui/common/icon-button/icon-button";


interface Props {
  item: CartItemType;
  qtyChangeHandler: (id: string, qty: number) => void;
  removeHandler: (id: string) => void;
}

/**
 * CartItem
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
const ResumeCartItem: React.FC<Props> = ({ item, qtyChangeHandler, removeHandler }) => {


  const handlerNewQuantityValue = (newQuantityValue: number) => {
    //validate item.countInStock
    qtyChangeHandler(item.itemId, newQuantityValue);
  };

  return (
    <div className="resume-product">
    <div className="resume-product-image">
    <img src={item.imageUrl} alt={item.name} width="50px" height="50px" />
    </div>
    <div className="resume-product-details">
      <div className="resume-product-title">
      <Link
        to={`/catalog/product/detail/${item.productId}`} >
        <p>{item.name}</p>
      </Link>
      </div>
      
    </div>
    <div className="resume-product-price">${item.grossPrice}</div>
    <div className="resume-product-quantity">
      <input type="number" value="2" min="1" />
    </div>
    <div className="resume-product-removal">
      <button className="resume-remove-product">
        Remove
      </button>
    </div>
    <div className="resume-product-sutotal">25.98</div>
  </div>
  );
};

export default ResumeCartItem;