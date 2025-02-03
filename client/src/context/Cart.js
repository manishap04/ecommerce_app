import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    const userCart = storedAuth?.user
      ? JSON.parse(localStorage.getItem(`cart-${storedAuth.user._id}`)) || []
      : JSON.parse(localStorage.getItem("cart-guest")) || [];

    setCart(userCart);
  }, []);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth?.user) {
      localStorage.setItem(`cart-${storedAuth.user._id}`, JSON.stringify(cart));
    } else {
      localStorage.setItem("cart-guest", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
