
import * as InfraConfig from 'infra/global.config';
import { IProductClient } from 'domain/service/product-client.interface';
import { ProductType } from 'domain/model/product/product.type';
import { FilteredProductsDTO } from 'domain/model/product/filtered-products';
import axiosInstance from './interceptor/axios.interceptor';
import { CategoryType } from 'domain/model/category/category.type';
import { ApiError, handleAxiosError } from './api.error';

/**
 * Product API HTML Client
 */
export default function ProductApiClientImpl(): IProductClient {


    async function getCategories(): Promise<Array<CategoryType>> {
        const myURL = `${InfraConfig.APIEndpoints.products}/categories/all`;
        const resp = await axiosInstance.get(myURL);
        return resp.data;
    };

    /**
     * Get Catalog
     * 
     * Request URL Example: http://localhost:3001/api/webshop/v1/products/catalog?category=Cat&page=1&limit=100&orderBy=name&isAsc=true
     */
    async function getCatalog(category: string, page: number, limit: number, orderBy: string): Promise<FilteredProductsDTO> {
        try {
            const myURL = `${InfraConfig.APIEndpoints.products}/catalog`;

            const params = new URLSearchParams();
            params.append('category', category.toString());
            params.append('page', page.toString());
            params.append('limit', limit.toString());
            params.append('orderBy', orderBy.toString());
            params.append('isAsc', 'true');

            const config = {
                //headers:  { 'Authorization': `Bearer ${appToken}` },
                params: params
            };

            const resp = await axiosInstance.get(myURL, config);
            console.log(resp);

            //concatenate image names with base path to get absolute urls
            const remoteUrl = InfraConfig.urlImages;
            const datacopy: [] = resp.data.list.map((element: any) => {
                const newImagesUrl: [] = element.images ? element.images.map((imgName: string) => `${remoteUrl}/${imgName}`) : 'NO_IMAGE';
                return { ...element, images: newImagesUrl }

            });

            return { ...resp.data, list: datacopy };
        } catch (error: any) {
            // response.status !== 200
            const authError: ApiError = handleAxiosError(error);
            throw authError;
        }
    };

    /**
     * Get Product Detail
     */
    async function getProductDetail(id: string): Promise<ProductType> {
        try {
            const myURL = `${InfraConfig.APIEndpoints.products}/detail/id/${id}`;

            const resp = await axiosInstance.get(myURL);

            //concatenate image names with base path to get absolute urls
            const remoteUrl = InfraConfig.urlImages;
            const newImagesUrl: [] = resp.data.images ? resp.data.images.map((imgName: string) => `${remoteUrl}/${imgName}`) : 'NO_IMAGE';

            return { ...resp.data, images: newImagesUrl };
        } catch (error: any) {
            // response.status !== 200
            const authError: ApiError = handleAxiosError(error);
            throw authError;
        }
    };

    return {
        getCatalog,
        getProductDetail,
        getCategories
    };
};