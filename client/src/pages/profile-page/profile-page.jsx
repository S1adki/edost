import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { findUserByEmail, isValidEmail } from "../../utils/auth-storage";
import {
  genderOptions,
  initialProfileForm,
  profileOrders,
  profileTabs,
} from "./profile-page.data";
import "./profile-page.css";
import "./profile-page-form.css";

const ProfilePage = () => {
  const { isAuth, logout, user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(profileTabs[0]);
  const [form, setForm] = useState(() => ({
    ...initialProfileForm,
    ...user,
    fullName: user.name || "",
  }));
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setForm({
      ...initialProfileForm,
      ...user,
      fullName: user.name || "",
    });
  }, [user]);

  useEffect(() => {
    if (!isAuth) {
      navigate(LOGIN_ROUTE);
    }
  }, [isAuth, navigate]);

  const handleChange = (field) => (event) => {
    setSaveMessage("");
    setSaveError("");
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleGenderSelect = (value) => {
    setSaveMessage("");
    setSaveError("");
    setForm((current) => ({
      ...current,
      gender: value,
    }));
  };

  return (
    <section className="profile-page">
      <div className="profile-page__card">
        <button
          className="profile-page__back"
          type="button"
          aria-label="Назад"
          onClick={() => navigate(SHOP_ROUTE)}
        >
          ←
        </button>

        <button
          className="profile-page__logout"
          type="button"
          onClick={() => {
            logout();
            navigate(SHOP_ROUTE);
          }}
        >
          Выйти
        </button>

        <h1 className="profile-page__title">Личный кабинет</h1>

        <div className="profile-page__tabs" role="tablist">
          {profileTabs.map((tab) => (
            <button
              key={tab}
              className={`profile-page__tab${
                activeTab === tab ? " profile-page__tab--active" : ""
              }`}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === profileTabs[0] ? (
          <form
            className="profile-page__form"
            onSubmit={(event) => {
              event.preventDefault();
              if (form.fullName.trim().length < 2) {
                setSaveError("ФИО должно быть не короче 2 символов.");
                return;
              }

              if (!isValidEmail(form.email)) {
                setSaveError("Введите корректный e-mail.");
                return;
              }

              const existingUser = findUserByEmail(form.email);

              if (
                existingUser &&
                existingUser.email.toLowerCase() !== user.accountEmail.toLowerCase()
              ) {
                setSaveError("Этот e-mail уже используется другим аккаунтом.");
                return;
              }

              updateUser({
                accountEmail: form.email,
                name: form.fullName,
                email: form.email,
                phone: form.phone,
                address: form.address,
                birthDate: form.birthDate,
                gender: form.gender,
              });
              setSaveError("");
              setSaveMessage("Данные профиля сохранены.");
            }}
          >
            <input
              className="profile-page__input"
              type="text"
              placeholder="ФИО"
              value={form.fullName}
              onChange={handleChange("fullName")}
            />

            <div className="profile-page__row">
              <div className="profile-page__gender-group">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`profile-page__gender${
                      form.gender === option.value
                        ? " profile-page__gender--active"
                        : ""
                    }`}
                    type="button"
                    onClick={() => handleGenderSelect(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <input
                className="profile-page__input profile-page__input--date"
                type="text"
                placeholder="Дата рождения"
                value={form.birthDate}
                onChange={handleChange("birthDate")}
              />
            </div>

            <input
              className="profile-page__input"
              type="tel"
              placeholder="Номер телефона"
              value={form.phone}
              onChange={handleChange("phone")}
            />

            <input
              className="profile-page__input"
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange("email")}
            />

            <input
              className="profile-page__input"
              type="text"
              placeholder="Адрес"
              value={form.address}
              onChange={handleChange("address")}
            />

            <button className="profile-page__submit" type="submit">
              Сохранить
            </button>

            {saveError ? (
              <p className="profile-page__message profile-page__message--error">
                {saveError}
              </p>
            ) : null}

            {saveMessage ? (
              <p className="profile-page__message profile-page__message--success">
                {saveMessage}
              </p>
            ) : null}
          </form>
        ) : (
          <section className="profile-page__orders">
            {profileOrders.map((order) => (
              <article key={order.id} className="profile-page__order-card">
                <div className="profile-page__order-head">
                  <div>
                    <h2 className="profile-page__order-title">{order.title}</h2>
                    <p className="profile-page__order-date">{order.date}</p>
                  </div>
                  <span className="profile-page__order-status">{order.status}</span>
                </div>

                <p className="profile-page__order-items">{order.items}</p>

                <div className="profile-page__order-footer">
                  <span className="profile-page__order-id">Заказ {order.id}</span>
                  <strong className="profile-page__order-total">{order.total}</strong>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
