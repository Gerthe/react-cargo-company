import './App.css';
import {Helmet} from "react-helmet";
import {TikTok} from "react-tiktok";
import HeroSection from "./components/HeroSection";
import Button from "./components/Button";
import Header from "./components/Header";
import {ConfigProvider, Flex, Input} from "antd";
import ServicesSection from "./components/ServicesSection";
import AdvantagesSection from "./components/AdvantagesSection";
import {DoubleRightOutlined} from "@ant-design/icons";
import {theme} from "./theme";

function App() {
  return (
    <ConfigProvider theme={theme}>
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
          <Flex justify='space-between'>
            <div style={{width: '50%'}}>
              <h2>Наш TikTok <DoubleRightOutlined/></h2>
              <p>Окунитесь в реальный процесс работы нашего склада и узнайте, как мы заботимся о ваших грузах! В нашем
                TikTok-канале Pekin Cargo 888 мы делимся короткими видео, которые показывают все этапы обработки товаров
                — от приема и сортировки до упаковки и отправки.</p>
              <p> Каждое видео — это возможность увидеть нашу команду в действии, познакомиться с нашими современными
                складскими технологиями и убедиться в нашей надежности. Присоединяйтесь к нашему сообществу на TikTok,
                следите за обновлениями и будьте в курсе всех новостей и полезных советов по логистике и доставке из
                Китая.</p>
            </div>
            <TikTok url='https://www.tiktok.com/@yourcat0222/video/7226469547300146433'/>
          </Flex>
        </section>

        <section className="contact-info">
          <h2>Напишите нам</h2>
          <Flex gap={40}>
            <div style={{width: '50%'}}>
              <div>Готовы обсудить детали? Свяжитесь с нами по телефону +77761234588 или отправьте нам сообщение через
                форму
                обратной связи. Наши специалисты всегда готовы ответить на все ваши вопросы и предоставить необходимую
                поддержку.
              </div>
            </div>

            <form style={{width: '50%'}}>
              <Input placeholder="Имя"/>
              <Input placeholder="Номер телефона"/>
              <Button type="primary">Отправить</Button>
            </form>

          </Flex>

        </section>

        <section className="faq">
          <h2>Часто задаваемые вопросы (FAQ)</h2>
          <strong>Каковы сроки доставки?</strong>
          Доставка занимает от 7 до 14 дней* (в праздничные дни дольше из-за таможни).
          <strong>Какие документы необходимы для оформления?</strong>
          Мы предоставим полный список необходимых документов и поможем в их оформлении.
          <strong>Как можно отслеживать мой груз?</strong>
          Вы можете отслеживать статус вашего груза в режиме онлайн через наш веб-сайт или мобильное приложение.
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
