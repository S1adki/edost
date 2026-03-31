import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">Едоставка</div>
        <div className="footer-links">
          <div className="footer-column">
            <span className="footer-title">О компании</span>
            <button className="footer-link" type="button">
              Пользовательское соглашение
            </button>
            <button className="footer-link" type="button">
              Правила рекомендаций
            </button>
            <button className="footer-link" type="button">
              Контакты
            </button>
          </div>
          <div className="footer-column">
            <span className="footer-title">Помощь</span>
            <button className="footer-link" type="button">
              Доставка
            </button>
            <button className="footer-link" type="button">
              Вопросы и ответы
            </button>
          </div>
        </div>
        <div className="footer-copy">© 2026 Едоставка. Все права защищены.</div>
      </div>
    </footer>
  );
};

export default Footer;

