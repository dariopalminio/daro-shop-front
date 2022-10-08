import { useContext, useEffect, useState } from 'react';
import { ApiError } from 'infra/client/api.error';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import * as GlobalConfig from 'infra/global.config';
import { FilteredProductsDTO } from 'domain/model/product/filtered-products';
import { ProductType } from 'domain/model/product/product.type';
import { IProductClient } from 'domain/service/product-client.interface';
import { IHookState, InitialState } from 'domain/hook/hook.type';
import { CategoryType } from 'domain/model/category/category.type';

/**
 * use Catalog
 * Custom hook
 * 
 * @returns 
 */
export default function useCatalog() {

    const productClient: IProductClient = GlobalConfig.Factory.get<IProductClient>('productClient');
    const [state, setState] = useState<IHookState>(InitialState);
    const [products, setProducts] = useState<Array<ProductType>>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const { removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [categories, setCategories] = useState<Array<CategoryType>>([]);
    const [categorySelectedIndex, setCategorySelectedIndex] = useState<number>(-1);


    const LIMIT_ITEMS_BY_PAGE = 8;

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
    
          return await getCatalog(1); //search data
        };
    
        fetchData()
          // make sure to catch any error
          .catch(console.error);;
    
      }, [categorySelectedIndex]);
      
    const getCategories =  async () => {
        const data: Array<CategoryType> = await productClient.getCategories();

        setCategories(data);
    };

    const getCatalog = async (page: number) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        try {
            let categoryName: string = '';
            if (categories && categories.length>0) 
                categoryName = categories[categorySelectedIndex].name? categories[categorySelectedIndex].name : '';
            
            const data: FilteredProductsDTO = await productClient.getCatalog(categoryName, page, LIMIT_ITEMS_BY_PAGE, "name");
            
            if (!data || !data.list || !data.page) {
                throw Error("fetching.error.malformed");
            }

            setProducts(data.list);
            setPage(data.page);
            let max = Math.round((data.count/LIMIT_ITEMS_BY_PAGE)+0.4);
            if (max===0) max = 1;
            setMaxPage(max);

            setState({ isProcessing: false, hasError: false, msg: "Success", isSuccess: true });
            return;
        } catch (error: any | ApiError) {
            let errorKey = error.message;
            if (error instanceof ApiError && (error.status === 400 || error.status === 401)) {
                errorKey = "auth.error.expired.token";
                removeSessionValue();
            }
            console.error(error);
            console.log("ERRROR:",error);
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
        }
    };

    const getNextPage = async () =>{
        if (page!==maxPage) await getCatalog(page + 1); //search data
      }
    
      const getPreviousPage = async () =>{
        console.log();
        if (page>0) await getCatalog(page - 1); //search data
      }


    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        page,
        maxPage,
        products,
        getCatalog,
        getPreviousPage,
        getNextPage,
        categories, categorySelectedIndex, setCategorySelectedIndex, getCategories
    };
};