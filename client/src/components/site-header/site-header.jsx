import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { PROFILE_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import "./site-header.css";

const SiteHeader = () => {
  const { isAuth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const profileInitial = isAuth ? user.email?.[0]?.toUpperCase() || "П" : "П";

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
            type="text"
            placeholder="искать в Едоставка"
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

        <button className="site-header__time" type="button">
          Сейчас
        </button>

        <button
          className={`site-header__profile${
            location.pathname === PROFILE_ROUTE
              ? " site-header__profile--active"
              : ""
          }`}
          type="button"
          onClick={() => navigate(PROFILE_ROUTE)}
        >
          <span className="site-header__profile-avatar" aria-hidden="true">
            {profileInitial}
          </span>
          <span className="site-header__profile-text">Профиль</span>
        </button>
      </div>
    </header>
  );
};

export default SiteHeader;
