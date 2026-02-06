

import { createContext, useContext, useEffect, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [orderType, setOrderType] = useState("Dine In");
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (dish, size) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === dish.id && i.size === size
      );

      if (existing) {
        return prev.map((i) =>
          i.id === dish.id && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          id: dish.id,
          name: dish.name,
          price: dish.prices[size],
          image: dish.image,
          qty: 1,
          size,
          note: "",
        },
      ];
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.id === id && i.size === size)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <MenuContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        showCart,
        setShowCart,
        orderType,
        setOrderType,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
