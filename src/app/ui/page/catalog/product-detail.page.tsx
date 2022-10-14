
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Link, useLocation, useParams,
} from "react-router-dom";
import useProducts from "domain/hook/products.hook";
import CircularProgress from "app/ui/common/progress/circular-progress";
import ProductDetail from "app/ui/component/product/product-detail";

type TParams = { productId: string };

/**
 * ProductDetailPage to search and show product detail data by productId passed as page parameter
 * 
 * Pattern: Container Component and Conditional Rendering
 */
function ProductDetailPage() {

  const { isProcessing, hasError, msg, isSuccess, product, getDetail } = useProducts();
  const { t } = useTranslation();
  const { productId } = useParams();
  const location = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {
      if (productId)
      return await getDetail(productId? productId : ''); //search data
    };

    const result = fetchData()
      .catch(console.error);;

    console.log(result);
  }, [])

  /** 
   * Retrieves the pathname entered in the state for the last link using location.
   * The pathname will be used to redirect after login success
   */
   const getPathname = () => {
    const pathname = location?.state?.pathname ? location.state.pathname : "/";
    return pathname;
  }

  return (
    <div className="container-page">
      <Link to={getPathname()}>&#8249; {t("back.to.previous")}</Link>
      {isProcessing &&
        <CircularProgress>{t('progress.loading')}</CircularProgress>
      }

      {hasError &&
        <h2>{hasError}</h2>
      }

      {isSuccess && <ProductDetail product={product} />
      }
    </div>
  );
};

export default ProductDetailPage;

