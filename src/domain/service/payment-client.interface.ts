

//Interface to do dependency inversion
export interface IPaymentClient {

    getPaymentMethodInfo: (
        key: string
    ) => Promise<any>;


};