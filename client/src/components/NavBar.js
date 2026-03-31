import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { PROFILE_ROUTE, SHOP_ROUTE } from "../utils/consts";

const NavBar = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const goHome = () => navigate(SHOP_ROUTE);
  const goProfile = () => navigate(PROFILE_ROUTE);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button type="button" className="navbar-logo" onClick={goHome}>
          Едоставка
        </button>
        <div className="navbar-search-wrapper">
          <input
            className="navbar-search"
            type="text"
            placeholder="Искать в Едоставка"
          />
        </div>
        <button type="button" className="navbar-location">
          <span className="navbar-location-city">Москва, улица Воздвиженка, 3/5</span>
          <span className="navbar-location-time">Сейчас</span>
        </button>
        <button
          type="button"
          className="navbar-profile"
          onClick={goProfile}
        >
          <div className="navbar-profile-avatar">
            {user.isAuth ? user.user.email?.[0]?.toUpperCase() || "П" : "В"}
          </div>
          <span className="navbar-profile-text">
            {user.isAuth ? "Профиль" : "Войти"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default NavBar;

