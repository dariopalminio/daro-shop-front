import { useState, useEffect } from 'react'
import { CartItemType } from 'domain/model/cart/cart-item.type';
import { ProductType } from 'domain/model/product/product.type';
import * as GlobalConfig from 'infra/global.config';

/**
 * Cart Custom Hook
 */
export const useCart = () => {
    const [cartItems, setCartItems] = useState<Array<CartItemType>>([]);
    const [cartSubTotal, setCartSubTotal] = useState<number>(0);
    const [cartShipping, setCartShipping] = useState<number>(0);
    const [cartTotal, setCartTotal] = useState<number>(0);

    useEffect(() => {
        const cartStorageItem = window.sessionStorage.getItem(GlobalConfig.CART_ITEM_NAME);
        const cartJSONString: string = cartStorageItem ? cartStorageItem : "";
        let myCartRecovered: Array<CartItemType>;
        if (cartJSONString !== "") {
            try {
                myCartRecovered = JSON.parse(cartJSONString);
                setCartItems(myCartRecovered);
            } catch (error) {
                setCartItems([]);
                console.log('Cannot load cart items from storage. ', error);
            }
        }
    }, []);

    useEffect(() => {
        calculateTotals(); //update calculated values
    }, [cartItems]);

    const calculateTotals = () => {
        let subTotalVal: number = 0;
        for (let i = 0; i < cartItems.length; i++) {
            subTotalVal += cartItems[i].amount;
        }
        setCartSubTotal(roundNumber(subTotalVal));
        const total: number = roundNumber(subTotalVal + 0.0 + cartShipping);
        setCartTotal(total);
    };

    const addToCart = (productItem: ProductType, qty: number) => {
        const newItem: CartItemType = { itemId: cartItems.length.toString(), productId: productItem._id, imageUrl: productItem.images[0], name: productItem.name, grossPrice: productItem.grossPrice, qty: qty, stock: productItem.stock, amount: (productItem.grossPrice * qty) };
        const newCartItems = [...cartItems, newItem];
        setCartItems(newCartItems);
        saveCart(newCartItems);
    }

    const removeFromCart = (id: string) => {
        setCartItems((currentCart) => {
            const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.itemId === id);

            if (indexOfItemToRemove === -1) {
                return currentCart;
            }
            const newCartItems = [
                ...currentCart.slice(0, indexOfItemToRemove),
                ...currentCart.slice(indexOfItemToRemove + 1),
            ];
            saveCart(newCartItems);
            return newCartItems;
        });

    };

    const getCartCount = (): number => {
        let totalVal = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalVal += cartItems[i].qty;
        }
        return totalVal;
    };

    /**
     * Update the selected quantity and calculate the amount
     * @param id  Item Id
     * @param qty Quantity selected
     */
    const changeItemQuantity = (id: string, qty: number) => {
        const indexToUpdate = cartItems.findIndex((cartItem) => cartItem.itemId === id);
        const searchObject = cartItems[indexToUpdate];

        const newAmount: number = roundNumber(qty * searchObject.grossPrice);

        const itemChanged = {
            ...searchObject,
            qty: qty,
            amount: newAmount
        }
        let newCartItems = [...cartItems];
        newCartItems[indexToUpdate] = itemChanged;
        setCartItems(newCartItems);
        saveCart(newCartItems);
    };

    const roundNumber = (numberToRound: number): number => {
        const num: number = Number(numberToRound) // The Number() only visualizes the type and is not needed
        const roundedString: string = num.toFixed(2); // toFixed() returns a string rounded
        return Number(roundedString);
    };

    /**
     * Save cart in storage
     */
    const saveCart = (items: Array<CartItemType>) => {
        const sessionStorageItem: string = JSON.stringify(items);
        window.sessionStorage.setItem(GlobalConfig.CART_ITEM_NAME, sessionStorageItem);
    };

    const getMoney = (): string => {
        return GlobalConfig.defaultMoney;
    };

    return {
        cartItems,
        cartSubTotal,
        setCartItems,
        setCartSubTotal,
        addToCart,
        removeFromCart,
        getCartCount,
        changeItemQuantity,
        cartShipping,
        setCartShipping,
        cartTotal,
        calculateTotals,
        getMoney
    };
};