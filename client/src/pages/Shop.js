import React from "react";

const Shop = () => {
  return (
    <div className="shop-layout">
      <div className="shop-main">
        <section className="shop-banners">
          <div className="shop-banner shop-banner-large">
            <div className="shop-banner-label">Горячо. Быстро. Вкусно.</div>
          </div>
          <div className="shop-banner shop-banner-medium">
            <div className="shop-banner-label">-50% доставка</div>
          </div>
          <div className="shop-banner shop-banner-small">
            <div className="shop-banner-label">% Скидки. SALE%</div>
          </div>
        </section>

        <section className="shop-section">
          <div className="shop-section-header">
            <h2 className="shop-section-title">Рестораны</h2>
            <div className="shop-tabs">
              <button className="shop-tab shop-tab-active" type="button">
                Все
              </button>
              <button className="shop-tab" type="button">
                Бургеры
              </button>
              <button className="shop-tab" type="button">
                Суши
              </button>
              <button className="shop-tab" type="button">
                Пицца
              </button>
              <button className="shop-tab" type="button">
                Паста
              </button>
              <button className="shop-tab" type="button">
                Завтраки
              </button>
              <button className="shop-tab" type="button">
                Обеды
              </button>
              <button className="shop-tab" type="button">
                Сортировка
              </button>
            </div>
          </div>

          <div className="card-grid">
            <div className="card">
              <div className="card-image card-image-1" />
              <div className="card-body">
                <div className="card-title">Грандиозно вкусно — и точка</div>
                <div className="card-meta">
                  <span>★ 4.5</span>
                  <span>45 – 55 мин</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-image card-image-2" />
              <div className="card-body">
                <div className="card-title">Бургер Кинг</div>
                <div className="card-meta">
                  <span>★ 4.2</span>
                  <span>35 – 45 мин</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-image card-image-3" />
              <div className="card-body">
                <div className="card-title">Шоколадница</div>
                <div className="card-meta">
                  <span>★ 4.7</span>
                  <span>25 – 35 мин</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-image card-image-4" />
              <div className="card-body">
                <div className="card-title">Суши Пицца Wok</div>
                <div className="card-meta">
                  <span>★ 4.0</span>
                  <span>60 – 70 мин</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-image card-image-5" />
              <div className="card-body">
                <div className="card-title">Папа Джонс</div>
                <div className="card-meta">
                  <span>★ 4.1</span>
                  <span>55 – 65 мин</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-image card-image-6" />
              <div className="card-body">
                <div className="card-title">Братья Караваевы</div>
                <div className="card-meta">
                  <span>★ 4.7</span>
                  <span>40 – 50 мин</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="shop-section">
          <div className="shop-section-header">
            <h2 className="shop-section-title">Магазины</h2>
          </div>

          <div className="card-grid">
            <div className="card card-horizontal">
              <div className="card-image card-image-market-1" />
              <div className="card-body">
                <div className="card-title">Перекресток</div>
                <div className="card-meta">
                  <span>★ 4.6</span>
                  <span>60 – 70 мин</span>
                </div>
              </div>
            </div>
            <div className="card card-horizontal">
              <div className="card-image card-image-market-2" />
              <div className="card-body">
                <div className="card-title">Вкусвилл</div>
                <div className="card-meta">
                  <span>★ 4.5</span>
                  <span>50 – 60 мин</span>
                </div>
              </div>
            </div>
            <div className="card card-horizontal">
              <div className="card-image card-image-market-3" />
              <div className="card-body">
                <div className="card-title">Азбука вкуса</div>
                <div className="card-meta">
                  <span>★ 4.7</span>
                  <span>45 – 55 мин</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside className="shop-sidebar">
        <div className="sidebar-card">
          <div className="sidebar-title">Доставка от 15 минут</div>
          <div className="sidebar-illustration" />
          <button className="sidebar-button" type="button">
            Добавьте что-нибудь
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Shop;

