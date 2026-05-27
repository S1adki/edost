import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartSidebar from "../../components/cart-sidebar/cart-sidebar";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useSearch } from "../../context/SearchContext";
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

const matchesSearch = (text, query) =>
  !query || text.toLowerCase().includes(query.toLowerCase());

const HomeCard = ({ item, onClick, isMarket = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    toggleFavorite(item.id);
  };

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
        <button
          className={`home-page__favorite${
            favorite ? " home-page__favorite--active" : ""
          }`}
          type="button"
          aria-label={favorite ? "Убрать из избранного" : "В избранное"}
          onClick={handleFavoriteClick}
        >
          {favorite ? "♥" : "♡"}
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
  const { addItem } = useCart();

  const handleAdd = (event) => {
    event.stopPropagation();
    addItem({
      id: `product-${product.id}`,
      title: product.title,
      price: product.price,
      emoji: product.emoji,
      vendor: product.vendor,
    });
  };

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
          <button
            className="home-page__product-button"
            type="button"
            aria-label="Добавить в корзину"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { query } = useSearch();
  const { ids: favoriteIds } = useFavorites();
  const [activeCategory, setActiveCategory] = useState(homeCategories[0]);
  const [activeSort, setActiveSort] = useState(homeSortOptions[0].id);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredRestaurants = homeRestaurants.filter((restaurant) => {
    const categoryMatch =
      activeCategory === "Все" ||
      restaurant.categories.includes(activeCategory);
    const searchMatch = matchesSearch(restaurant.title, query);
    const favoriteMatch = !showFavoritesOnly || favoriteIds.includes(restaurant.id);
    return categoryMatch && searchMatch && favoriteMatch;
  });

  const filteredMarkets = homeMarkets.filter(
    (market) =>
      matchesSearch(market.title, query) &&
      (!showFavoritesOnly || favoriteIds.includes(market.id))
  );

  const filteredProducts = homeProducts.filter((product) =>
    matchesSearch(`${product.title} ${product.vendor}`, query)
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
          <div className="home-page__section-head">
            <h2 className="home-page__section-title">Рестораны</h2>
            <button
              className={`home-page__favorites-toggle${
                showFavoritesOnly ? " home-page__favorites-toggle--active" : ""
              }`}
              type="button"
              onClick={() => setShowFavoritesOnly((current) => !current)}
            >
              {showFavoritesOnly ? "♥ Избранное" : "♡ Избранное"}
            </button>
          </div>

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
              {showFavoritesOnly
                ? "В избранном пока нет заведений"
                : query
                  ? `По запросу «${query}» ничего не найдено`
                  : "В этой категории пока нет заведений"}
            </p>
          )}
        </section>

        {filteredMarkets.length > 0 ? (
          <section className="home-page__section">
            <h2 className="home-page__section-title">Магазины</h2>

            <div className="home-page__grid">
              {filteredMarkets.map((item) => (
                <HomeCard
                  key={item.id}
                  item={item}
                  isMarket
                  onClick={() => goToRestaurant(item.id)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {filteredProducts.length > 0 ? (
          <section className="home-page__section">
            <h2 className="home-page__section-title">Популярные товары</h2>

            <div className="home-page__products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ) : null}
      </section>

      <CartSidebar />
    </div>
  );
};

export default HomePage;
