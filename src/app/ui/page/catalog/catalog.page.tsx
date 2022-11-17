
import { FunctionComponent } from "react";
import { useTranslation } from 'react-i18next';
import useCatalog from "domain/hook/catalog.hook";
import Products from "app/ui/component/product/products";
import { LinksStepper, CenteringContainer, CircularProgress, Alert, Pagination } from "daro-ui-kit";

/**
 * CatalogPage for to list products as catalog
 * 
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Custom hook
 */
const CatalogPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const { isProcessing, hasError, msg, isSuccess, page, maxPage, products, getPreviousPage,
    getNextPage, getCatalog, categories, getCategories, setCategorySelectedIndex, categorySelectedIndex } = useCatalog();

  const handleChangeCategory = async (index: number) => {
    setCategorySelectedIndex(index);

  }


  return (
    <div className="page_container">

      <LinksStepper list={categories} currentIndex={categorySelectedIndex} onClick={(index: number) => handleChangeCategory(index)}/>

      {isProcessing &&
        <CircularProgress>{t('progress.loading')}</CircularProgress>
      }

      {hasError &&
        <Alert severity="error">{t(msg)}</Alert>
      }

      {isSuccess && <>
        <Products productList={products} />

        <CenteringContainer style={{ marginTop: "15px" }}>
          <Pagination
            page={page}
            maxPage={maxPage}
            onClickPrevious={() => getPreviousPage()}
            onClickNext={() => getNextPage()}
            previousLabel={t('previous')}
            ofLabel={t('of')}
            nextLabel={t('next')} />
        </CenteringContainer>
      </>
      }
    </div>
  );
};

export default CatalogPage;