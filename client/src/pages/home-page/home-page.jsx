import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FOOD_ROUTE } from "../../utils/consts";
import {
  homeBanners,
  homeCategories,
  homeMarkets,
  homeProducts,
  homeRestaurants,
  homeSortOptions,
} from "./home-page.data";
import "./home-page.css";
import "./home-page-banner.css";
import "./home-page-card.css";
import "./home-page-sidebar.css";

const HomeCard = ({ item, onClick, isMarket = false }) => {
  return (
    <article
      className="home-page__card"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className={`home-page__card-media home-page__card-media--${item.accent}`}>
        <button className="home-page__favorite" type="button" aria-label="В избранное">
          ♡
        </button>
        {item.note ? <span className="home-page__card-note">{item.note}</span> : null}
        <span className="home-page__card-emoji" aria-hidden="true">
          {item.emoji}
        </span>
      </div>

      <div className="home-page__card-body">
        <h3 className="home-page__card-title">{item.title}</h3>
        {item.subtitle ? (
          <p className="home-page__card-subtitle">{item.subtitle}</p>
        ) : null}
        <div className="home-page__card-meta">
          <span>✦ {item.rating}</span>
          <span>{item.time}</span>
        </div>
        {item.price ? (
          <div className="home-page__card-price">{item.price}</div>
        ) : null}
        {item.label ? (
          <span className="home-page__card-label">{item.label}</span>
        ) : isMarket ? null : null}
      </div>
    </article>
  );
};

const ProductCard = ({ product }) => {
  return (
    <article className="home-page__product-card">
      <div
        className={`home-page__product-media home-page__product-media--${product.accent}`}
      >
        <span className="home-page__product-emoji" aria-hidden="true">
          {product.emoji}
        </span>
      </div>

      <div className="home-page__product-body">
        <span className="home-page__product-vendor">{product.vendor}</span>
        <h3 className="home-page__product-title">{product.title}</h3>
        <p className="home-page__product-weight">{product.weight}</p>
        <div className="home-page__product-footer">
          <strong>{product.price} ₽</strong>
          {product.oldPrice ? <span>{product.oldPrice} ₽</span> : null}
          <button className="home-page__product-button" type="button" aria-label="Добавить">
            +
          </button>
        </div>
      </div>
    </article>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(homeCategories[0]);
  const [activeSort, setActiveSort] = useState(homeSortOptions[0].id);
  const filteredRestaurants =
    activeCategory === "Все"
      ? homeRestaurants
      : homeRestaurants.filter((restaurant) =>
          restaurant.categories.includes(activeCategory)
        );
  const visibleRestaurants = [...filteredRestaurants].sort((first, second) => {
    if (activeSort === "fast") {
      return first.deliveryMinutes - second.deliveryMinutes;
    }

    if (activeSort === "cheap") {
      return first.minPrice - second.minPrice;
    }

    if (activeSort === "rating") {
      return second.ratingValue - first.ratingValue;
    }

    return 0;
  });

  const goToRestaurant = (id) => {
    navigate(`${FOOD_ROUTE}/${id}`);
  };

  return (
    <div className="home-page">
      <section className="home-page__content">
        <div className="home-page__banners">
          {homeBanners.map((banner) => (
            <article
              key={banner.id}
              className={`home-page__banner home-page__banner--${banner.accent}`}
            >
              <strong className="home-page__banner-title">{banner.title}</strong>
              <span className="home-page__banner-emoji" aria-hidden="true">
                {banner.emoji}
              </span>
            </article>
          ))}
        </div>

        <section className="home-page__section">
          <h2 className="home-page__section-title">Рестораны</h2>

          <div className="home-page__filters">
            {homeCategories.map((category) => (
              <button
                key={category}
                className={`home-page__filter${
                  activeCategory === category ? " home-page__filter--active" : ""
                }`}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}

            <div className="home-page__sort" aria-label="Сортировка ресторанов">
              {homeSortOptions.map((option) => (
                <button
                  key={option.id}
                  className={`home-page__sort-button${
                    activeSort === option.id ? " home-page__sort-button--active" : ""
                  }`}
                  type="button"
                  onClick={() => setActiveSort(option.id)}
                >
                  {option.title}
                </button>
              ))}
            </div>
          </div>

          {visibleRestaurants.length > 0 ? (
            <div className="home-page__grid">
              {visibleRestaurants.map((item) => (
                <HomeCard
                  key={item.id}
                  item={item}
                  onClick={() => goToRestaurant(item.id)}
                />
              ))}
            </div>
          ) : (
            <p className="home-page__empty">
              В этой категории пока нет заведений
            </p>
          )}
        </section>

        <section className="home-page__section">
          <h2 className="home-page__section-title">Магазины</h2>

          <div className="home-page__grid">
            {homeMarkets.map((item) => (
              <HomeCard
                key={item.id}
                item={item}
                isMarket
                onClick={() => goToRestaurant(item.id)}
              />
            ))}
          </div>
        </section>

        <section className="home-page__section">
          <h2 className="home-page__section-title">Популярные товары</h2>

          <div className="home-page__products-grid">
            {homeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </section>

      <aside className="home-page__sidebar">
        <div className="home-page__basket">
          <h2 className="home-page__basket-title">Доставка от 15 минут</h2>

          <div className="home-page__courier" aria-hidden="true">
            <div className="home-page__courier-head" />
            <div className="home-page__courier-body">
              <span className="home-page__courier-box home-page__courier-box--top" />
              <span className="home-page__courier-box home-page__courier-box--bottom" />
            </div>
          </div>

          <button className="home-page__basket-button" type="button">
            Добавьте что нибудь
          </button>
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
