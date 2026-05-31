export const promoCodes = {
  EDOSTAVKA10: { type: "percent", value: 10, label: "Скидка 10%" },
  SALE150: { type: "fixed", value: 150, label: "Скидка 150 ₽" },
  FREEDEL: { type: "freeDelivery", value: 0, label: "Бесплатная доставка" },
};

export const FREE_DELIVERY_THRESHOLD = 1000;
export const DEFAULT_DELIVERY_FEE = 149;

export const applyPromo = (code, subtotal) => {
  const normalized = (code || "").trim().toUpperCase();
  const promo = promoCodes[normalized];

  if (!promo) {
    return { valid: false, discount: 0, freeDelivery: false, label: "" };
  }

  if (promo.type === "percent") {
    return {
      valid: true,
      discount: Math.round(subtotal * (promo.value / 100)),
      freeDelivery: false,
      label: promo.label,
      code: normalized,
    };
  }

  if (promo.type === "fixed") {
    return {
      valid: true,
      discount: Math.min(promo.value, subtotal),
      freeDelivery: false,
      label: promo.label,
      code: normalized,
    };
  }

  if (promo.type === "freeDelivery") {
    return {
      valid: true,
      discount: 0,
      freeDelivery: true,
      label: promo.label,
      code: normalized,
    };
  }

  return { valid: false, discount: 0, freeDelivery: false, label: "" };
};

export const calcDeliveryFee = (subtotal, promoResult) => {
  if (subtotal >= FREE_DELIVERY_THRESHOLD || promoResult?.freeDelivery) {
    return 0;
  }
  return DEFAULT_DELIVERY_FEE;
};
