import React, { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { deliveryTimeOptions, useDelivery } from "../../context/DeliveryContext";
import { useSearch } from "../../context/SearchContext";
import { useTheme } from "../../context/ThemeContext";
import { BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import "./site-header.css";

const SiteHeader = () => {
  const { isAuth, user } = useContext(AuthContext);
  const { query, setQuery } = useSearch();
  const { totalCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { address, selectedTime, setTimeId, openAddressModal } = useDelivery();
  const navigate = useNavigate();
  const location = useLocation();
  const [timeOpen, setTimeOpen] = useState(false);
  const timeRef = useRef(null);

  const profileInitial = isAuth ? user.email?.[0]?.toUpperCase() || "П" : "П";
  const profileRoute = isAuth ? PROFILE_ROUTE : LOGIN_ROUTE;
  const profileLabel = isAuth ? "Профиль" : "Войти";

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button
          className="site-header__logo"
          type="button"
          onClick={() => navigate(SHOP_ROUTE)}
        >
          Едоставка
        </button>

        <label className="site-header__search">
          <span className="site-header__search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            className="site-header__search-input"
            type="search"
            placeholder="искать в Едоставка"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <button
          className="site-header__address"
          type="button"
          onClick={openAddressModal}
        >
          <span className="site-header__address-icon" aria-hidden="true">
            ⌂
          </span>
          <span className="site-header__address-text">{address}</span>
        </button>

        <div className="site-header__time-wrap" ref={timeRef}>
          <button
            className="site-header__time"
            type="button"
            onClick={() => setTimeOpen((current) => !current)}
            aria-expanded={timeOpen}
            aria-haspopup="listbox"
          >
            {selectedTime.label}
          </button>
          {timeOpen ? (
            <ul className="site-header__time-menu" role="listbox">
              {deliveryTimeOptions.map((option) => (
                <li key={option.id}>
                  <button
                    className={`site-header__time-option${
                      selectedTime.id === option.id
                        ? " site-header__time-option--active"
                        : ""
                    }`}
                    type="button"
                    role="option"
                    aria-selected={selectedTime.id === option.id}
                    onClick={() => {
                      setTimeId(option.id);
                      setTimeOpen(false);
                    }}
                  >
                    <span>{option.label}</span>
                    <span className="site-header__time-eta">{option.eta}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <button
          className={`site-header__basket${
            location.pathname === BASKET_ROUTE
              ? " site-header__basket--active"
              : ""
          }`}
          type="button"
          onClick={() => navigate(BASKET_ROUTE)}
          aria-label={`Корзина${totalCount ? `, ${totalCount} товаров` : ""}`}
        >
          <span aria-hidden="true">🛒</span>
          {totalCount > 0 ? (
            <span className="site-header__basket-badge">{totalCount}</span>
          ) : null}
        </button>

        <button
          className="site-header__theme"
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Светлая тема" : "Тёмная тема"}
        >
          {isDark ? "☀" : "☾"}
        </button>

        <button
          className={`site-header__profile${
            location.pathname === profileRoute
              ? " site-header__profile--active"
              : ""
          }`}
          type="button"
          onClick={() => navigate(profileRoute)}
        >
          <span className="site-header__profile-avatar" aria-hidden="true">
            {profileInitial}
          </span>
          <span className="site-header__profile-text">{profileLabel}</span>
        </button>
      </div>
    </header>
  );
};

export default SiteHeader;
