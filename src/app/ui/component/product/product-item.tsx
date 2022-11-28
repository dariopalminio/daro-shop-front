import { Link, useLocation } from "react-router-dom";
import CartContext, { ICartContext } from 'domain/context/cart.context';
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductType } from "domain/model/product/product.type";
import NoImage from "app/ui/image/no_image.png";
import styled from "styled-components";
import { Button, ButtonQuantity, PaperHoverable } from "oaky-ui-kit";

//box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

const ProductItemWrapper = styled.div`
  .linkframe:link { text-decoration: none; }
  .linkframe:visited { text-decoration: none; }
  .linkframe:hover { text-decoration: none; }
  .linkframe:active { text-decoration: none; }
  .product_info > p {
    margin-bottom: 16px;
  }
  .info_price {
    font-weight: bold;
    color:rgb(5, 5, 5)
  }
  .info_name {
    font-size: 1rem;
    margin-top: 10px;
    color:rgb(5, 5, 5)
  }
  .info_description {
    font-size: 0.8rem;
    color:rgba(16, 17, 16, 0.678)
  }
`;

const ProductItemImg = styled.img`
  width: 100%;
  height: 170px;
  object-fit: contain;
  border-radius: 6px;
`;

const BottomCallToAction = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
 `;

interface IProps {
  productItem: ProductType;
}

/**
 * Product Item
 * 
 */
const ProductItem: React.FC<IProps> = (props: IProps) => {

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext) as ICartContext;
  const { t } = useTranslation();
  const location = useLocation();

  const addToCartHandler = () => {
    if (props.productItem && quantity > 0) addToCart(props.productItem, quantity);
    else console.log("No tiene productos que agregar!");
  };

  const handlerNewQuantityValue = (newQuantityValue: number) => {
    setQuantity(newQuantityValue);

  };

  const getImage = () => {
    return props.productItem.images ? props.productItem.images[0] : NoImage;
  }

  const getDescription = () => {
    let descrip = '';
    if (props.productItem?.description){
      if (props.productItem.description.length>60){
        descrip = props.productItem.description.substring(0, 57) + '...';
      } else {
        descrip = props.productItem.description;
      }
    }
    return descrip;
  }

  const getPrice = () => {
    return props.productItem.grossPrice ? props.productItem.grossPrice : "No price!";
  }

  return (
    <ProductItemWrapper>
      <PaperHoverable width={'400px'}>
        <Link to={`/catalog/product/detail/${props.productItem.id}`} state={location} className="linkframe">
          <ProductItemImg style={{ position: "relative", margin: "2px", width: "100%" }}
            src={getImage()} alt={props.productItem.name}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = NoImage;
            }}
            loading="lazy" />
        </Link>

        <Link to={`/catalog/product/detail/${props.productItem.id}`} className="linkframe">
          <div className="product_info">
            <p className="info_name">{props.productItem.name}</p>

            <p className="info_description">{getDescription()}</p>

            <p className="info_price">${getPrice()}</p>

          </div>
        </Link>

        <BottomCallToAction>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonQuantity
              value={quantity}
              onChange={(newQuantityValue: number) => handlerNewQuantityValue(newQuantityValue)} />
          </div>
          <Button
            onClick={addToCartHandler}>
            {t('cart.button.add.to.cart')}
          </Button>
        </BottomCallToAction>
      </PaperHoverable>
    </ProductItemWrapper>

  );
};

export default ProductItem;