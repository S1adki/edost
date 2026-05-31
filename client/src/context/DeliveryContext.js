import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const DELIVERY_STORAGE_KEY = "edostavka_delivery";

export const deliveryTimeOptions = [
  { id: "now", label: "Сейчас", eta: "30–45 мин" },
  { id: "30", label: "Через 30 мин", eta: "~30 мин" },
  { id: "60", label: "Через 1 час", eta: "~60 мин" },
  { id: "120", label: "Через 2 часа", eta: "~2 ч" },
];

const defaultDelivery = {
  address: "Москва, улица Воздвиженка, 3/5",
  timeId: "now",
};

const loadDelivery = () => {
  try {
    const saved = localStorage.getItem(DELIVERY_STORAGE_KEY);
    return saved ? { ...defaultDelivery, ...JSON.parse(saved) } : defaultDelivery;
  } catch {
    return defaultDelivery;
  }
};

export const DeliveryContext = createContext(null);

export const DeliveryProvider = ({ children }) => {
  const [delivery, setDelivery] = useState(loadDelivery);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(DELIVERY_STORAGE_KEY, JSON.stringify(delivery));
  }, [delivery]);

  const setAddress = useCallback((address) => {
    setDelivery((current) => ({ ...current, address }));
  }, []);

  const setTimeId = useCallback((timeId) => {
    setDelivery((current) => ({ ...current, timeId }));
  }, []);

  const openAddressModal = useCallback(() => setIsAddressModalOpen(true), []);
  const closeAddressModal = useCallback(() => setIsAddressModalOpen(false), []);

  const selectedTime = useMemo(
    () =>
      deliveryTimeOptions.find((option) => option.id === delivery.timeId) ||
      deliveryTimeOptions[0],
    [delivery.timeId]
  );

  const value = useMemo(
    () => ({
      address: delivery.address,
      timeId: delivery.timeId,
      selectedTime,
      isAddressModalOpen,
      setAddress,
      setTimeId,
      openAddressModal,
      closeAddressModal,
    }),
    [
      delivery,
      selectedTime,
      isAddressModalOpen,
      setAddress,
      setTimeId,
      openAddressModal,
      closeAddressModal,
    ]
  );

  return (
    <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error("useDelivery must be used within DeliveryProvider");
  }
  return context;
};
