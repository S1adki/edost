import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../../utils/consts";
import { authPageContent } from "./auth-page.data";
import "./auth-page.css";
import "./auth-page-form.css";

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isRegistration = location.pathname === REGISTRATION_ROUTE;
  const content = isRegistration
    ? authPageContent.registration
    : authPageContent.login;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      name: form.name || "Пользователь",
      email: form.email,
    });
    navigate(PROFILE_ROUTE);
  };

  return (
    <section className="auth-page">
      <div className="auth-page__panel auth-page__panel--promo">
        <button
          className="auth-page__back"
          type="button"
          onClick={() => navigate(SHOP_ROUTE)}
        >
          ← На главную
        </button>

        <div className="auth-page__promo-content">
          <span className="auth-page__eyebrow">{content.eyebrow}</span>
          <h1 className="auth-page__title">{content.title}</h1>
          <p className="auth-page__description">{content.description}</p>

          <div className="auth-page__benefits">
            <div className="auth-page__benefit">
              <span className="auth-page__benefit-icon" aria-hidden="true">
                ⚡
              </span>
              <span>Быстрый повтор заказов</span>
            </div>
            <div className="auth-page__benefit">
              <span className="auth-page__benefit-icon" aria-hidden="true">
                ❤
              </span>
              <span>Сохранённые любимые рестораны</span>
            </div>
            <div className="auth-page__benefit">
              <span className="auth-page__benefit-icon" aria-hidden="true">
                📍
              </span>
              <span>Адреса и история доставок</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-page__panel auth-page__panel--form">
        <div className="auth-page__switch">
          <Link
            className={`auth-page__switch-link${
              !isRegistration ? " auth-page__switch-link--active" : ""
            }`}
            to={LOGIN_ROUTE}
          >
            Вход
          </Link>
          <Link
            className={`auth-page__switch-link${
              isRegistration ? " auth-page__switch-link--active" : ""
            }`}
            to={REGISTRATION_ROUTE}
          >
            Регистрация
          </Link>
        </div>

        <form className="auth-page__form" onSubmit={handleSubmit}>
          {isRegistration ? (
            <label className="auth-page__field">
              <span className="auth-page__label">Имя</span>
              <input
                className="auth-page__input"
                type="text"
                placeholder="Как к вам обращаться"
                value={form.name}
                onChange={handleChange("name")}
              />
            </label>
          ) : null}

          <label className="auth-page__field">
            <span className="auth-page__label">E-mail</span>
            <input
              className="auth-page__input"
              type="email"
              placeholder="Введите e-mail"
              value={form.email}
              onChange={handleChange("email")}
            />
          </label>

          <label className="auth-page__field">
            <span className="auth-page__label">Пароль</span>
            <input
              className="auth-page__input"
              type="password"
              placeholder="Введите пароль"
              value={form.password}
              onChange={handleChange("password")}
            />
          </label>

          {isRegistration ? (
            <label className="auth-page__field">
              <span className="auth-page__label">Повторите пароль</span>
              <input
                className="auth-page__input"
                type="password"
                placeholder="Повторите пароль"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
            </label>
          ) : null}

          <button className="auth-page__submit" type="submit">
            {content.submitText}
          </button>
        </form>

        <p className="auth-page__secondary">
          {content.secondaryText}{" "}
          <Link className="auth-page__secondary-link" to={content.secondaryLinkTo}>
            {content.secondaryLinkText}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthPage;
