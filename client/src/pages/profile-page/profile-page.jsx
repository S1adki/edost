import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../../utils/consts";
import {
  genderOptions,
  initialProfileForm,
  profileTabs,
} from "./profile-page.data";
import "./profile-page.css";
import "./profile-page-form.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab] = useState(profileTabs[0]);
  const [form, setForm] = useState(initialProfileForm);

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleGenderSelect = (value) => {
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

        <h1 className="profile-page__title">Личный кабинет</h1>

        <div className="profile-page__tabs" role="tablist">
          {profileTabs.map((tab) => (
            <button
              key={tab}
              className={`profile-page__tab${
                activeTab === tab ? " profile-page__tab--active" : ""
              }`}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <form
          className="profile-page__form"
          onSubmit={(event) => event.preventDefault()}
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
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
