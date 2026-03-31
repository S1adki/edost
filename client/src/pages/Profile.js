import React, { useContext } from "react";
import { Context } from "..";

const Profile = () => {
  const { user } = useContext(Context);

  const email = user.user?.email || "user@example.com";
  const name = user.user?.name || "Ваше имя";

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {email[0].toUpperCase()}
          </div>
          <div>
            <div className="profile-name">{name}</div>
            <div className="profile-email">{email}</div>
          </div>
        </div>

        <div className="profile-section">
          <h2 className="profile-section-title">Личные данные</h2>
          <div className="profile-grid">
            <div className="profile-field">
              <label className="profile-label">Имя</label>
              <input className="profile-input" type="text" defaultValue={name} />
            </div>
            <div className="profile-field">
              <label className="profile-label">Телефон</label>
              <input
                className="profile-input"
                type="tel"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div className="profile-field">
              <label className="profile-label">E-mail</label>
              <input className="profile-input" type="email" defaultValue={email} />
            </div>
          </div>
          <button className="profile-save-button" type="button">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

