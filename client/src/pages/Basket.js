import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useDelivery } from "../context/DeliveryContext";
import { useOrders } from "../context/OrdersContext";
import { SHOP_ROUTE } from "../utils/consts";
import {
  applyPromo,
  calcDeliveryFee,
  FREE_DELIVERY_THRESHOLD,
} from "../utils/promo-codes";
import "./basket.css";

const trackingSteps = [
  "Заказ принят",
  "Готовится",
  "Курьер в пути",
  "Доставлен",
];

const Basket = () => {
  const { items, totalPrice, totalCount, updateQuantity, removeItem, clearCart } =
    useCart();
  const { addOrder } = useOrders();
  const { address, selectedTime } = useDelivery();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [trackingStep, setTrackingStep] = useState(0);

  const promoResult = useMemo(
    () => appliedPromo || { valid: false, discount: 0, freeDelivery: false },
    [appliedPromo]
  );

  const deliveryFee = calcDeliveryFee(totalPrice, promoResult);
  const discount = promoResult.discount || 0;
  const finalTotal = Math.max(0, totalPrice - discount + deliveryFee);

  useEffect(() => {
    if (!orderPlaced) {
      return undefined;
    }

    const timers = [
      setTimeout(() => setTrackingStep(1), 2000),
      setTimeout(() => setTrackingStep(2), 5000),
      setTimeout(() => setTrackingStep(3), 9000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [orderPlaced]);

  const handleApplyPromo = () => {
    const result = applyPromo(promoInput, totalPrice);
    if (!result.valid) {
      setPromoError("Промокод не найден");
      setAppliedPromo(null);
      return;
    }
    setPromoError("");
    setAppliedPromo(result);
  };

  const handleOrder = () => {
    if (items.length === 0) {
      return;
    }

    const vendor = items[0]?.vendor || "Едоставка";
    const itemsText = items
      .map((item) => `${item.title}${item.quantity > 1 ? ` ×${item.quantity}` : ""}`)
      .join(", ");

    const order = addOrder({
      title: vendor,
      items: itemsText,
      itemsData: items.map(({ id, title, price, quantity, emoji, vendor: v }) => ({
        id,
        title,
        price,
        quantity,
        emoji,
        vendor: v,
      })),
      total: `${finalTotal.toLocaleString("ru-RU")} ₽`,
      totalValue: finalTotal,
      address,
      deliveryTime: selectedTime.label,
      promo: appliedPromo?.code || null,
    });

    setOrderPlaced(order);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="basket-page">
        <div className="basket-page__success">
          <span className="basket-page__success-icon" aria-hidden="true">
            🎉
          </span>
          <h1>Заказ {orderPlaced.id} оформлен!</h1>
          <p>
            Доставка: {orderPlaced.address}
            <br />
            Время: {orderPlaced.deliveryTime}
          </p>

          <div className="basket-page__tracking">
            {trackingSteps.map((step, index) => (
              <div
                key={step}
                className={`basket-page__tracking-step${
                  index <= trackingStep ? " basket-page__tracking-step--done" : ""
                }${index === trackingStep ? " basket-page__tracking-step--current" : ""}`}
              >
                <span className="basket-page__tracking-dot" />
                <span>{step}</span>
              </div>
            ))}
          </div>

          <button
            className="basket-page__back-button"
            type="button"
            onClick={() => navigate(SHOP_ROUTE)}
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="basket-page">
        <div className="basket-page__empty">
          <span className="basket-page__empty-icon" aria-hidden="true">
            🛒
          </span>
          <h1>Корзина пуста</h1>
          <p>Добавьте блюда из ресторанов или магазинов</p>
          <button
            className="basket-page__back-button"
            type="button"
            onClick={() => navigate(SHOP_ROUTE)}
          >
            Выбрать еду
          </button>
        </div>
      </div>
    );
  }

  const remainingForFreeDelivery =
    totalPrice < FREE_DELIVERY_THRESHOLD
      ? FREE_DELIVERY_THRESHOLD - totalPrice
      : 0;

  return (
    <div className="basket-page">
      <header className="basket-page__header">
        <button
          className="basket-page__back"
          type="button"
          onClick={() => navigate(SHOP_ROUTE)}
          aria-label="Назад"
        >
          ←
        </button>
        <h1 className="basket-page__title">Корзина · {totalCount}</h1>
        <button
          className="basket-page__clear"
          type="button"
          onClick={clearCart}
        >
          Очистить
        </button>
      </header>

      <div className="basket-page__delivery-info">
        <span>⌂ {address}</span>
        <span>🕐 {selectedTime.label}</span>
      </div>

      {remainingForFreeDelivery > 0 && !promoResult.freeDelivery ? (
        <div className="basket-page__free-delivery">
          <div className="basket-page__free-delivery-bar">
            <span
              style={{ width: `${Math.min(100, (totalPrice / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
            />
          </div>
          <p>
            До бесплатной доставки ещё {remainingForFreeDelivery} ₽
          </p>
        </div>
      ) : null}

      <ul className="basket-page__list">
        {items.map((item) => (
          <li key={item.id} className="basket-page__item">
            <span className="basket-page__emoji" aria-hidden="true">
              {item.emoji || "🍽️"}
            </span>
            <div className="basket-page__info">
              <strong>{item.title}</strong>
              {item.vendor ? (
                <span className="basket-page__vendor">{item.vendor}</span>
              ) : null}
              <span className="basket-page__price">{item.price} ₽</span>
            </div>
            <div className="basket-page__controls">
              <button
                type="button"
                aria-label="Уменьшить"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                aria-label="Увеличить"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="basket-page__remove"
              type="button"
              aria-label="Удалить"
              onClick={() => removeItem(item.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className="basket-page__promo">
        <input
          className="basket-page__promo-input"
          type="text"
          placeholder="Промокод"
          value={promoInput}
          onChange={(event) => {
            setPromoInput(event.target.value);
            setPromoError("");
          }}
          onKeyDown={(event) => event.key === "Enter" && handleApplyPromo()}
        />
        <button
          className="basket-page__promo-button"
          type="button"
          onClick={handleApplyPromo}
        >
          Применить
        </button>
      </div>
      {promoError ? (
        <p className="basket-page__promo-error">{promoError}</p>
      ) : null}
      {appliedPromo ? (
        <p className="basket-page__promo-success">
          ✓ {appliedPromo.label} ({appliedPromo.code})
        </p>
      ) : (
        <p className="basket-page__promo-hint">
          Попробуйте: EDOSTAVKA10, SALE150, FREEDEL
        </p>
      )}

      <footer className="basket-page__footer">
        <div className="basket-page__summary">
          <span>Товары</span>
          <span>{totalPrice} ₽</span>
        </div>
        {discount > 0 ? (
          <div className="basket-page__summary basket-page__summary--discount">
            <span>Скидка</span>
            <span>−{discount} ₽</span>
          </div>
        ) : null}
        <div className="basket-page__summary">
          <span>Доставка</span>
          <span>{deliveryFee === 0 ? "Бесплатно" : `${deliveryFee} ₽`}</span>
        </div>
        <div className="basket-page__summary basket-page__summary--total">
          <span>Итого</span>
          <span>{finalTotal} ₽</span>
        </div>
        <button
          className="basket-page__order-button"
          type="button"
          onClick={handleOrder}
        >
          Оформить заказ · {finalTotal} ₽
        </button>
      </footer>
    </div>
  );
};

export default Basket;
