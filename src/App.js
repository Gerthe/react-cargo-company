import './App.css';
import {Helmet} from "react-helmet";
import {TikTok} from "react-tiktok";
import HeroSection from "./components/HeroSection";
import Button from "./components/Button";
import Header from "./components/Header";
import {ConfigProvider, Typography} from "antd";
import ServicesSection from "./components/ServicesSection";
import AdvantagesSection from "./components/AdvantagesSection";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#540d6e',
          colorBgBase: '#eef0f2',
          borderRadius: 3,
        },
        Button: {
          primaryColor: '#ffd23f',

        }
      }}
    >
      <div className="App">
        <Helmet>
          <meta charSet="utf-8"/>
          <title>CargoCompany</title>
          <link rel="canonical" href="http://CargoCompany/example"/>
        </Helmet>

        <Header/>

        <HeroSection/>
        <ServicesSection/>
        <AdvantagesSection/>

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
              <li>Складирование</li>
              <li>Преимущества</li>
              <li>FAQ</li>
            </ul>
          </nav>
          <div className="social-media">[Social Media Links]</div>
          <div className="legal-info">[Правовая информация]</div>
        </footer>
      </div>
    </ConfigProvider>
  );
}

export default App;
