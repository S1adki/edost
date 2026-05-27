import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { BASKET_ROUTE } from "../../utils/consts";
import "./cart-sidebar.css";

const CartSidebar = () => {
  const { items, totalCount, totalPrice } = useCart();
  const navigate = useNavigate();
  const hasItems = totalCount > 0;

  return (
    <aside className="cart-sidebar">
      <div className="cart-sidebar__panel">
        <h2 className="cart-sidebar__title">
          {hasItems ? `Корзина · ${totalCount}` : "Доставка от 15 минут"}
        </h2>

        {hasItems ? (
          <ul className="cart-sidebar__list">
            {items.slice(0, 4).map((item) => (
              <li key={item.id} className="cart-sidebar__item">
                <span className="cart-sidebar__emoji" aria-hidden="true">
                  {item.emoji || "🍽️"}
                </span>
                <div className="cart-sidebar__info">
                  <span className="cart-sidebar__name">{item.title}</span>
                  <span className="cart-sidebar__meta">
                    {item.quantity} × {item.price} ₽
                  </span>
                </div>
              </li>
            ))}
            {items.length > 4 ? (
              <li className="cart-sidebar__more">
                ещё {items.length - 4} поз.
              </li>
            ) : null}
          </ul>
        ) : (
          <div className="cart-sidebar__courier" aria-hidden="true">
            <div className="cart-sidebar__courier-head" />
            <div className="cart-sidebar__courier-body">
              <span className="cart-sidebar__courier-box cart-sidebar__courier-box--top" />
              <span className="cart-sidebar__courier-box cart-sidebar__courier-box--bottom" />
            </div>
          </div>
        )}

        <button
          className={`cart-sidebar__button${
            hasItems ? " cart-sidebar__button--active" : ""
          }`}
          type="button"
          onClick={() => hasItems && navigate(BASKET_ROUTE)}
          disabled={!hasItems}
        >
          {hasItems ? `Оформить · ${totalPrice} ₽` : "Добавьте что-нибудь"}
        </button>
      </div>
    </aside>
  );
};

export default CartSidebar;
