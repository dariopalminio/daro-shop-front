import { FC } from "react";
import CheckoutContext from "domain/context/checkout.context";
import { useCheckout } from "domain/hook/checkout.hook";

interface Props { children?: React.ReactNode }

/**
 * Checkout Context Provider
 */
const CheckoutContextProvider: FC<Props> = ({ children }) => {
    const {
        profileInitialized,
        setProfileInitialized,
        currentSelectedAddresIndex,
        setCurrentSelectedAddresIndex,
        addressToDelivery,
        setAddressToDelivery,
        profile,
        setProfile,
        shippingData,
        setShippingPrice
    } = useCheckout();

    return (
        <CheckoutContext.Provider
            value={{
                profileInitialized,
                setProfileInitialized,
                currentSelectedAddresIndex,
                setCurrentSelectedAddresIndex,
                addressToDelivery,
                setAddressToDelivery,
                profile,
                setProfile,
                shippingData,
                setShippingPrice
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutContextProvider;