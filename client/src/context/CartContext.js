import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "edostavka_cart";

const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadCart);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const showToast = useCallback((message) => {
    setToast(message);
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, []);

  const addItem = useCallback(
    (product) => {
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...current, { ...product, quantity: 1 }];
      });
      showToast(`${product.title} добавлен в корзину`);
    },
    [showToast]
  );

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      toast,
      totalCount,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, toast, totalCount, totalPrice, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
