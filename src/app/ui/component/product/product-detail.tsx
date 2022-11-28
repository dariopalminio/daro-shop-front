import "./product-detail.css";
import { useState, useContext } from "react";
import CartContext, { ICartContext } from "domain/context/cart.context";
import { useTranslation } from "react-i18next";
import { ProductType } from "domain/model/product/product.type";
import { Button, Alert, CenteringContainer, SingleAttrTable, ButtonQuantity, ImgCarousel } from "oaky-ui-kit";

interface IProps {
  money: string;
  product: ProductType | null;
}

/**
 * Product Item
 * 
 */
const ProductDetail: React.FC<IProps> = (props: IProps) => {

  const { addToCart } = useContext(CartContext) as ICartContext; //With custom hook
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    if (props.product && quantity > 0) addToCart(props.product, quantity);
    else console.log("No tiene producto que agregar!");
  };

  const handlerNewQuantityValue = (newQuantityValue: number) => {
    setQuantity(newQuantityValue);

  };

  const getAttributes = () => {
    if (props.product) {
      const attrs: Array<{ label: string, value: string }> = [
        { label: 'Category', value: props.product.category },
        { label: 'Type', value: props.product.type },
        { label: 'Brand', value: props.product.brand },
        { label: 'Color', value: props.product.color },
        { label: 'Size', value: props.product.size },
        { label: 'Gender', value: props.product.gender },
        { label: 'sku', value: props.product.sku }
      ]
      return attrs;
    }
    return [];
  };


  return (
    <div className="product_detail_container">
      <>
        {props.product && (
          <>
            <div className="product_image_resume">
              <div className="frame_image">
                <p className="product_name">{props.product.name}</p>
                <ImgCarousel
                  uniqueId={props.product.id}
                  images={props.product.images}
                  width={"100%"} height={"300px"} />
                <p>{props.product.description}</p>
              </div>
            </div>

            <div className="prod_info">
              <p>{t('cart.price')}: ${props.product.grossPrice}</p>
              <div style={{ marginBottom: "10px" }}>Características principales:</div>
              <SingleAttrTable rowDictionary={getAttributes()} />

              <div className="call_to_action">
                <div className="call_to_action_info">
                  <p>
                    {t('cart.price')}:
                    <span>({props.money}) $ {props.product.grossPrice}</span>
                  </p>
                  <p>
                    {t('cart.detail.state')}:
                    <span>
                      {props.product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </p>

                  <CenteringContainer>
                    <ButtonQuantity value={quantity} onChange={(newQuantityValue: number) => handlerNewQuantityValue(newQuantityValue)} />
                  </CenteringContainer>

                  <p>
                    <Button onClick={addToCartHandler}>
                      {t('cart.button.add.to.cart')}
                    </Button>
                  </p>
                </div>
              </div>

            </div>
          </>
        )}
      </>

      {!props.product && <Alert severity="error">{t("producto.error.loading")}</Alert>}

    </div>
  );
};

export default ProductDetail;