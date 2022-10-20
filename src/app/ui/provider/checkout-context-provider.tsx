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
        profile,
        setProfile,
        shippingData,
        setShippingPrice,
        canContinueToPayment,
        initializeOrder,
        order,
        isProcessing,
        hasError,
        msg,
        isSuccess,
        includesShipping, 
        SetIncludesShipping
    } = useCheckout();

    return (
        <CheckoutContext.Provider
            value={{
                profileInitialized,
                setProfileInitialized,
                currentSelectedAddresIndex,
                setCurrentSelectedAddresIndex,
                profile,
                setProfile,
                shippingData,
                setShippingPrice,
                canContinueToPayment,
                initializeOrder,
                order,
                isProcessing,
                hasError,
                msg,
                isSuccess,
                includesShipping, 
                SetIncludesShipping
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutContextProvider;