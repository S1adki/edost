import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartSidebar from "../../components/cart-sidebar/cart-sidebar";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { SHOP_ROUTE } from "../../utils/consts";
import { restaurantCatalog } from "./restaurant-catalog.data";
import { getRestaurantPageData } from "./restaurant-page.data";
import "./restaurant-page.css";
import "./restaurant-page-hero.css";
import "./restaurant-page-card.css";
import "./restaurant-page-sidebar.css";

const categoryKeywordMap = {
  "новинки и акции": ["новинк", "акци", "скидк", "комбо", "выгод"],
  популярное: ["хит", "популяр", "фирмен", "топ"],
  напитки: ["кофе", "чай", "лимонад", "сок", "вода", "напит", "коктейл"],
  "бургеры и роллы": ["бургер", "ролл", "сэндвич", "воппер"],
  бургеры: ["бургер", "чизбургер", "воппер"],
  картофель: ["картофель", "фри", "дольк"],
  закуски: ["наггетс", "крылыш", "кольц", "закуск", "снек"],
  соусы: ["соус"],
  завтраки: ["завтрак", "сырник", "каша", "омлет", "круассан"],
  кофе: ["кофе", "латте", "раф", "капуч", "эспрессо"],
  сэндвичи: ["сэндвич", "тост"],
  десерты: ["десерт", "чизкейк", "брауни", "эклер", "тирамису", "сладк"],
  суши: ["суши", "нигири"],
  роллы: ["ролл", "филадельф"],
  пицца: ["пицца", "пепперони", "маргарита"],
  wok: ["wok", "вок", "удон", "лапша"],
  салаты: ["салат", "цезарь"],
  супы: ["суп", "борщ", "мiso", "мисо"],
  горячее: ["котлета", "паста", "горяч"],
  выпечка: ["выпеч", "пирог", "круассан", "булочк"],
  "овощи и фрукты": ["овощ", "фрукт", "банан", "яблок", "ягод"],
  молочка: ["молок", "кефир", "йогурт", "творог", "сыр"],
  "готовая еда": ["готов", "салат", "паста", "обед"],
  "свежие продукты": ["свеж", "фермер", "натураль"],
  снеки: ["снек", "чипс", "батончик", "орех"],
  "для дома": ["для дома", "салфет", "пакет", "быт"],
  премиум: ["премиум", "прошутто", "бри"],
  "сыры и мясо": ["сыр", "мяс", "прошутто", "ветчин"],
  "готовая кухня": ["паста", "готов", "кулинар"],
  "быстрые покупки": ["быстр", "вода", "хлеб", "молок"],
  "товары дома": ["товары дома", "салфет", "быт", "пакет"],
  фрукты: ["фрукт", "манго", "яблок", "банан", "киви"],
  ягоды: ["ягод", "клубник", "голубик", "малина"],
  наборы: ["набор", "ассорти"],
  сухофрукты: ["сухофрукт", "кураг", "изюм"],
  акции: ["акци", "скидк", "выгод"],
};

const normalizeText = (value) => (value || "").toLowerCase();

const filterProductsByCategory = (products, activeCategory) => {
  if (!activeCategory || activeCategory === "Все") {
    return products;
  }

  const normalizedCategory = normalizeText(activeCategory);
  const keywords = categoryKeywordMap[normalizedCategory] || [normalizedCategory];

  return products.filter((product) => {
    const searchableText = normalizeText(
      `${product.title} ${product.description} ${product.meta} ${product.details} ${product.badge} ${product.category}`
    );

    return keywords.some((keyword) => searchableText.includes(keyword));
  });
};

const RestaurantCard = ({ product, restaurantId, restaurantTitle }) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: `restaurant-${restaurantId}-${product.id}`,
      title: product.title,
      price: product.price,
      emoji: product.emoji,
      vendor: restaurantTitle,
    });
  };

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
        <p className="restaurant-page__product-description">{product.description}</p>
        <p className="restaurant-page__product-details">{product.details}</p>
        <button
          className="restaurant-page__add-button"
          type="button"
          onClick={handleAdd}
        >
          В корзину
        </button>
      </div>
    </article>
  );
};

const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurantId = Number(id);
  const { categories, featuredProducts, promoProducts } = getRestaurantPageData(id);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const currentRestaurant = restaurantCatalog[id] || restaurantCatalog[1];
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(restaurantId);

  useEffect(() => {
    setActiveCategory(categories[0]);
  }, [categories]);

  const filteredFeaturedProducts = filterProductsByCategory(
    featuredProducts,
    activeCategory
  );
  const filteredPromoProducts = filterProductsByCategory(
    promoProducts,
    activeCategory
  );

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
                <button
                  className={`restaurant-page__favorite${
                    favorite ? " restaurant-page__favorite--active" : ""
                  }`}
                  type="button"
                  aria-label={favorite ? "Убрать из избранного" : "В избранное"}
                  onClick={() => toggleFavorite(restaurantId)}
                >
                  {favorite ? "♥" : "♡"}
                </button>
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
          {categories.map((category) => (
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
          {filteredFeaturedProducts.map((product) => (
            <RestaurantCard
              key={product.id}
              product={product}
              restaurantId={restaurantId}
              restaurantTitle={currentRestaurant.title}
            />
          ))}
        </section>

        <section className="restaurant-page__section">
          <h2 className="restaurant-page__section-title">Новинки и Акции</h2>

          <div className="restaurant-page__products restaurant-page__products--secondary">
            {filteredPromoProducts.map((product) => (
              <RestaurantCard
                key={product.id}
                product={product}
                restaurantId={restaurantId}
                restaurantTitle={currentRestaurant.title}
              />
            ))}
          </div>
        </section>
      </section>

      <CartSidebar />
    </div>
  );
};

export default RestaurantPage;
