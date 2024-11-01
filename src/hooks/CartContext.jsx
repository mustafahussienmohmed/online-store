import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchCart } from "../api/shopServer";
import { AuthContext } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { authenticationData } = useContext(AuthContext);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      if (authenticationData) {
        try {
          const response = await fetchCart();
          setCartData(response);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getCart();
  }, [authenticationData]);

  const refreshCart = async () => {
    if (authenticationData) {
      setLoading(true);
      try {
        const response = await fetchCart();
        setCartData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const value = {
    cartData,
    loading,
    error,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
