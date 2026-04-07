import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SHOP_ROUTE } from "../../utils/consts";
import { restaurantCatalog } from "./restaurant-catalog.data";
import {
  featuredProducts,
  promoProducts,
  restaurantCategories,
} from "./restaurant-page.data";
import "./restaurant-page.css";
import "./restaurant-page-hero.css";
import "./restaurant-page-card.css";
import "./restaurant-page-sidebar.css";

const RestaurantCard = ({ product }) => {
  return (
    <article className="restaurant-page__product-card">
      <div
        className={`restaurant-page__product-media restaurant-page__product-media--${product.accent}`}
      >
        {product.badge ? (
          <span className="restaurant-page__product-badge">{product.badge}</span>
        ) : null}
        <span className="restaurant-page__product-emoji" aria-hidden="true">
          {product.emoji}
        </span>
      </div>

      <div className="restaurant-page__product-info">
        <strong className="restaurant-page__product-price">{product.price} ₽</strong>
        <h3 className="restaurant-page__product-title">{product.title}</h3>
        <p className="restaurant-page__product-meta">{product.meta}</p>
      </div>
    </article>
  );
};

const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(restaurantCategories[0]);
  const currentRestaurant = restaurantCatalog[id] || restaurantCatalog[1];

  return (
    <div className="restaurant-page">
      <section className="restaurant-page__content">
        <header className="restaurant-page__hero">
          <button
            className="restaurant-page__back"
            type="button"
            aria-label="Назад"
            onClick={() => navigate(SHOP_ROUTE)}
          >
            ←
          </button>

          <div className="restaurant-page__hero-body">
            <div>
              <h1 className="restaurant-page__title">
                {currentRestaurant.title}{" "}
                <span className="restaurant-page__favorite">♡</span>
              </h1>
              <p className="restaurant-page__subtitle">
                {currentRestaurant.subtitle}
              </p>
            </div>

            <div className="restaurant-page__rating">
              <span aria-hidden="true">★</span>
              <span>{currentRestaurant.rating}</span>
            </div>
          </div>
        </header>

        <div className="restaurant-page__categories" role="tablist">
          {restaurantCategories.map((category) => (
            <button
              key={category}
              className={`restaurant-page__category${
                activeCategory === category
                  ? " restaurant-page__category--active"
                  : ""
              }`}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
          <button
            className="restaurant-page__category restaurant-page__category--arrow"
            type="button"
          >
            →
          </button>
        </div>

        <section className="restaurant-page__products">
          {featuredProducts.map((product) => (
            <RestaurantCard key={product.id} product={product} />
          ))}
        </section>

        <section className="restaurant-page__section">
          <h2 className="restaurant-page__section-title">Новинки и Акции</h2>

          <div className="restaurant-page__products restaurant-page__products--secondary">
            {promoProducts.map((product) => (
              <RestaurantCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </section>

      <aside className="restaurant-page__sidebar">
        <div className="restaurant-page__basket">
          <h2 className="restaurant-page__basket-title">Доставка от 15 минут</h2>

          <div className="restaurant-page__courier" aria-hidden="true">
            <div className="restaurant-page__courier-head" />
            <div className="restaurant-page__courier-body">
              <span className="restaurant-page__courier-box restaurant-page__courier-box--top" />
              <span className="restaurant-page__courier-box restaurant-page__courier-box--bottom" />
            </div>
          </div>

          <button className="restaurant-page__basket-button" type="button">
            Добавьте что нибудь
          </button>
        </div>
      </aside>
    </div>
  );
};

export default RestaurantPage;
