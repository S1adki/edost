import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SHOP_ROUTE } from "../utils/consts";
import "./basket.css";

const Basket = () => {
  const { items, totalPrice, totalCount, updateQuantity, removeItem, clearCart } =
    useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const deliveryFee = totalPrice >= 1000 ? 0 : 149;

  const handleOrder = () => {
    if (items.length === 0) {
      return;
    }
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="basket-page">
        <div className="basket-page__success">
          <span className="basket-page__success-icon" aria-hidden="true">
            🎉
          </span>
          <h1>Заказ оформлен!</h1>
          <p>Курьер уже в пути. Ожидайте доставку 30–45 минут.</p>
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

      <footer className="basket-page__footer">
        <div className="basket-page__summary">
          <span>Товары</span>
          <span>{totalPrice} ₽</span>
        </div>
        <div className="basket-page__summary">
          <span>Доставка</span>
          <span>{deliveryFee === 0 ? "Бесплатно" : `${deliveryFee} ₽`}</span>
        </div>
        <div className="basket-page__summary basket-page__summary--total">
          <span>Итого</span>
          <span>{totalPrice + deliveryFee} ₽</span>
        </div>
        <button
          className="basket-page__order-button"
          type="button"
          onClick={handleOrder}
        >
          Оформить заказ · {totalPrice + deliveryFee} ₽
        </button>
      </footer>
    </div>
  );
};

export default Basket;
