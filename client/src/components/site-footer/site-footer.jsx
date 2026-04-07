import React from "react";
import "./site-footer.css";

const footerLinks = [
  "Пользовательское соглашение",
  "Правила рекомендаций",
  "Контакты",
  "Доставка",
  "Вопросы и ответы",
];

const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <h2 className="site-footer__title">О компании</h2>

        <nav className="site-footer__nav" aria-label="О компании">
          {footerLinks.map((item) => (
            <button key={item} className="site-footer__link" type="button">
              {item}
            </button>
          ))}
        </nav>

        <p className="site-footer__copy">
          © 2026 Едоставка. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
