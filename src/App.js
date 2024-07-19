import './App.css';
import {Helmet} from "react-helmet";
import Menu from "./components/Menu";
import {TikTok} from "react-tiktok";
import HeroSection from "./components/HeroSection";
import Button from "./components/Button";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8"/>
        <title>CargoCompany</title>
        <link rel="canonical" href="http://CargoCompany/example"/>
      </Helmet>
      <header className="header">
        <div className="header-content">
          <h1>Название компании</h1>
          <div className="contact-info-header">
            <p>Телефон: +123 456 789</p>
            <p>Адрес: Примерный адрес, 123</p>
          </div>
        </div>
        <Menu/>
      </header>

      <HeroSection/>

      <section id="services" className="services">
        <h2>Наши Услуги</h2>
        <div className="service">
          <h3>Автомобильные перевозки</h3>
          <p>Преимущества</p>
          <p>Сроки доставки</p>
          <p>Цены</p>
          <Button className="red-button">Подробнее</Button>
        </div>
      </section>

      <section className="customs">
        <h2>Таможенные услуги</h2>
        <p>Таможенное оформление</p>
        <p>Таможенное сопровождение</p>
        <p>Консультации</p>
        <Button>Подробнее</Button>
      </section>

      <section className="warehousing">
        <h2>Складирование</h2>
        <p>Услуги складирования</p>
        <p>Управление запасами</p>
        <p>Преимущества</p>
        <Button>Подробнее</Button>
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
        <h2>Наш TikTok</h2>
        <p>Видео о приеме товара на складе</p>
        <TikTok url='https://www.tiktok.com/@yourcat0222/video/7226469547300146433'/>
      </section>

      <section className="contact-info">
        <h2>Напишите нам</h2>
        <label>
          Телефон
          <input type='phone'/>
        </label>

        <p>Электронная почта</p>
        <form>
          <label>Сообщение:</label>
          <textarea placeholder="Ваше сообщение"></textarea>
          <Button>Отправить</Button>
        </form>
      </section>

      <section className="faq">
        <h2>Часто задаваемые вопросы (FAQ)</h2>
        <div className="faq-item">[FAQ Item Placeholder]</div>
        <Button>Подробнее</Button>
      </section>

      <footer className="footer">
        <nav>
          <ul>
            <li>Услуги</li>
            <li>Таможенные услуги</li>
            <li>Складирование</li>
            <li>Преимущества</li>
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
