import { useContext, useState } from 'react';
import { ApiError } from 'infra/client/api.error';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import * as GlobalConfig from 'infra/global.config';
import { ProductType } from 'domain/model/product/product.type';
import { IProductClient } from 'domain/service/product-client.interface';
import { IHookState, InitialState } from './hook.type';

/**
 * use Product
 * Custom hook
 * 
 * @returns 
 */
export default function useProducts() {

    const productClient: IProductClient = GlobalConfig.Factory.get<IProductClient>('productClient');
    const [state, setState] = useState<IHookState>(InitialState);
    const [product, setProduct] = useState<ProductType|null>(null);
    const { removeSessionValue } = useContext(SessionContext) as ISessionContext;

    const getDetail = async (id: string | undefined) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        if (!id || id.trim()==='') {
            setState({ isProcessing: false, hasError: true, msg: 'Product Id is undefined!', isSuccess: false });
            return;
        }
        try {
            const data = await productClient.getProductDetail(id);

            setProduct(data);

            setState({ isProcessing: false, hasError: false, msg: "Success", isSuccess: true });
            return data;
        } catch (error: any | ApiError) {
            let errorKey = error.message;
            if (error instanceof ApiError && (error.status === 400 || error.status === 401)) {
                errorKey = "auth.error.expired.token";
                removeSessionValue();
            }
            console.error(error);
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            throw error;
        }
    };

    const getMoney = (): string => {
        return GlobalConfig.defaultMoney;
    };

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        product,
        getDetail,
        getMoney
    };
};