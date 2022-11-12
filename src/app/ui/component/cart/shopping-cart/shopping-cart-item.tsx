
import "./shopping-cart.css";
import { Link, useLocation } from "react-router-dom";
import { RiDeleteBin7Fill } from "react-icons/ri";;
import { IconButton } from "daro-ui-kit";

interface IProps {
  readOnly: boolean;
  item: any;
  qtyChangeHandler: (id: string, qty: number) => void;
  removeHandler: (id: string) => void;
}

/**
 * CartItem
 * 
 * Pattern: Compound Component, Presentation Component and Controled Component
 */
const ShoppingCartItem: React.FC<IProps> = (props: IProps) => {
  const location = useLocation();

  const handlerChanfeInputQty = (e: React.FormEvent<HTMLInputElement>) => {
    if (!props.readOnly) {
      const newValue: number = parseInt(e.currentTarget.value);
      props.qtyChangeHandler(props.item.productId, newValue);
    }
  };

  return (
    <div className="shopping-cart-product">
      <div className="shopping-cart-product-image">
        <img src={props.item.imageUrl} alt={props.item.name} width="50px" height="50px" />
      </div>
      <div className="shopping-cart-product-details">
        <div className="shopping-cart-product-title">
          {!props.readOnly &&
            <Link
              to={`/catalog/product/detail/${props.item.productId}`} state={location}>
              <p>{props.item.name}</p>
            </Link>
          }
          {props.readOnly &&
            <p>{props.item.name}</p>
          }
        </div>
      </div>
      <div className="shopping-cart-product-price">{props.item.grossPrice}</div>
      <div className="shopping-cart-product-quantity">
        <input type="number" defaultValue={props.item.qty} min="1" onChange={(e) => handlerChanfeInputQty(e)} disabled={props.readOnly} />
      </div>
      {!props.readOnly &&
        <div className="shopping-cart-product-removal">
          <IconButton
            onClick={() => props.removeHandler(props.item.productId)}>
            <RiDeleteBin7Fill size={20} color="grey" />
          </IconButton>
        </div>
      }
      <div className="shopping-cart-product-amount">{props.item.amount}</div>
    </div>
  );
};

export default ShoppingCartItem;