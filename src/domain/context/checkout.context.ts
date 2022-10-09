import { createContext } from 'react';

export interface ICheckoutContext {
    steps: Array<any>
    setSteps: (changedSteps: Array<any>) => void
};

export const CheckoutContextDefaultValues: ICheckoutContext = {
    steps: [],
    setSteps: (changedSteps: Array<any>) => { }
};

// Global Checkout context
const CheckoutContext = createContext<ICheckoutContext>(CheckoutContextDefaultValues);

export default CheckoutContext;