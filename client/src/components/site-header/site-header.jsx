import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";
import { useTheme } from "../../context/ThemeContext";
import { BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import "./site-header.css";

const SiteHeader = () => {
  const { isAuth, user } = useContext(AuthContext);
  const { query, setQuery } = useSearch();
  const { totalCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

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

        <button className="site-header__address" type="button">
          <span className="site-header__address-icon" aria-hidden="true">
            ⌂
          </span>
          <span className="site-header__address-text">
            Москва, улица Воздвиженка, 3/5
          </span>
        </button>

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
