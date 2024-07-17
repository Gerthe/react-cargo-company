
import './App.css';
import { Button } from 'antd';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1>Название компании</h1>
          <div className="contact-info-header">
            <p>Телефон: +123 456 789</p>
            <p>Адрес: Примерный адрес, 123</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>Главная</li>
            <li>Услуги</li>
            <li>О нас</li>
            <li>Таможенные услуги</li>
            <li>Складирование</li>
            <li>Преимущества</li>
            <li>Контакты</li>
            <li>FAQ</li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Краткое описание компании</h2>
          <Button className="blue-button">Узнать больше</Button>
        </div>
      </section>

      <section className="services">
        <h2>Наши Услуги</h2>
        <div className="service">
          <h3>Автомобильные перевозки</h3>
          <p>Преимущества</p>
          <p>Сроки доставки</p>
          <p>Цены</p>
          <button className="red-button">Подробнее</button>
        </div>
      </section>

      <section className="customs">
        <h2>Таможенные услуги</h2>
        <p>Таможенное оформление</p>
        <p>Таможенное сопровождение</p>
        <p>Консультации</p>
        <button className="red-button">Подробнее</button>
      </section>

      <section className="warehousing">
        <h2>Складирование</h2>
        <p>Услуги складирования</p>
        <p>Управление запасами</p>
        <p>Преимущества</p>
        <button className="red-button">Подробнее</button>
      </section>

      <section className="advantages">
        <h2>Преимущества компании</h2>
        <ul>
          <li>Надежность</li>
          <li>Конкурентные цены</li>
          <li>Мониторинг груза 24/7</li>
          <li>Гарантии и страхование</li>
        </ul>
      </section>

      <section className="tiktok-video">
        <h2>Видео из TikTok</h2>
        <p>Видео о приеме товара на складе</p>
        <div className="video-placeholder">[Video Placeholder]</div>
      </section>

      <section className="contact-info">
        <h2>Контактная информация</h2>
        <p>Адрес</p>
        <p>Телефон</p>
        <p>Электронная почта</p>
        <form>
          <label>Сообщение:</label>
          <textarea placeholder="Ваше сообщение"></textarea>
          <button className="blue-button">Отправить</button>
        </form>
      </section>

      <section className="faq">
        <h2>Часто задаваемые вопросы (FAQ)</h2>
        <div className="faq-item">[FAQ Item Placeholder]</div>
        <button className="blue-button">Подробнее</button>
      </section>

      <footer className="footer">
        <nav>
          <ul>
            <li>Главная</li>
            <li>Услуги</li>
            <li>О нас</li>
            <li>Таможенные услуги</li>
            <li>Складирование</li>
            <li>Преимущества</li>
            <li>Контакты</li>
            <li>FAQ</li>
          </ul>
        </nav>
        <div className="social-media">[Social Media Links]</div>
        <div className="legal-info">[Правовая информация]</div>
      </footer>
    </div>
  );
}

export default App;
