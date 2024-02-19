import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems(currentItems => {
            const itemExists = currentItems.find(cartItem => cartItem.id === item.id);
            if (itemExists) return currentItems;
            return [...currentItems, item];
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== itemId));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
