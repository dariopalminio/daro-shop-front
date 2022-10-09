import { FC } from "react";
import { useCart } from "domain/hook/cart.hook";
import CheckoutContext from "domain/context/checkout.context";
import { useCheckout } from "domain/hook/checkout.hook";

interface Props {children?: React.ReactNode}

/**
 * Checkout Context Provider
 */
const CheckoutContextProvider: FC<Props> = ({ children }) => {
    const {
        steps,
        setSteps
    } = useCheckout();

    return (
        <CheckoutContext.Provider
            value={{
                steps,
                setSteps
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutContextProvider;