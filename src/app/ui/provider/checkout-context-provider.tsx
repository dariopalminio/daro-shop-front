import { FC } from "react";
import CheckoutContext from "domain/context/checkout.context";
import { useCheckout } from "domain/hook/checkout.hook";

interface Props { children?: React.ReactNode }

/**
 * Checkout Context Provider
 */
const CheckoutContextProvider: FC<Props> = ({ children }) => {
    const {
        steps,
        setSteps,
        addressToDelivery,
        setAddressToDelivery,
        profile, 
        setProfile
    } = useCheckout();

    return (
        <CheckoutContext.Provider
            value={{
                steps,
                setSteps,
                addressToDelivery,
                setAddressToDelivery,
                profile, 
                setProfile
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutContextProvider;