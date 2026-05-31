import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ORDERS_STORAGE_KEY = "edostavka_orders";

const loadOrders = () => {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const formatOrderDate = () => {
  return new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const OrdersContext = createContext(null);

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = useCallback((orderData) => {
    const order = {
      id: `ED-${Date.now().toString().slice(-6)}`,
      date: formatOrderDate(),
      status: "В пути",
      ...orderData,
    };
    setOrders((current) => [order, ...current]);
    return order;
  }, []);

  const value = useMemo(() => ({ orders, addOrder }), [orders, addOrder]);

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
};
