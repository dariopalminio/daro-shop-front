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
        profileInitialized,
        setProfileInitialized,
        currentSelectedAddresIndex,
        setCurrentSelectedAddresIndex,
        addressToDelivery,
        setAddressToDelivery,
        profile,
        setProfile,
        getShippingPrice,
        shippingData
    } = useCheckout();

    return (
        <CheckoutContext.Provider
            value={{
                steps,
                setSteps,
                profileInitialized,
                setProfileInitialized,
                currentSelectedAddresIndex,
                setCurrentSelectedAddresIndex,
                addressToDelivery,
                setAddressToDelivery,
                profile,
                setProfile,
                getShippingPrice,
                shippingData
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutContextProvider;