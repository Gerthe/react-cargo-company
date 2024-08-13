import './App.css';
import {Helmet} from "react-helmet";
import {TikTok} from "react-tiktok";
import HeroSection from "./components/HeroSection";
import HeaderSection from "./components/HeaderSection";
import {ConfigProvider, Flex, Layout} from "antd";
import ServicesSection from "./components/ServicesSection";
import AdvantagesSection from "./components/AdvantagesSection";
import {DoubleRightOutlined} from "@ant-design/icons";
import {theme} from "./theme";
import ContactForm from "./components/ContactForm";
import FaqSection from "./components/FaqSection";
import FooterSection from "./components/FooterSection";

const {Header, Footer, Content} = Layout;

const headerStyle = {
  textAlign: 'center',
  height:248,
  lineHeight: '24px',
  backgroundColor: 'var(--light)',
  padding: '24px 0'
};

const footerStyle = {
  backgroundColor: 'var(--main)',
  color: 'var(--secondary)',
  textAlign: 'center'
};

function App() {
  const videoUrl = 'https://www.tiktok.com/@yourcat0222/video/7226469547300146433';

  return (
    <ConfigProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Pekin Cargo 888</title>
        <link rel="canonical" href="http://CargoCompany/example"/>
      </Helmet>

      <Flex gap="middle" wrap>
        <Layout>
          <Header style={headerStyle}>
            <HeaderSection/>
          </Header>

          <Content>
            <HeroSection/>
            <ServicesSection/>
            <AdvantagesSection/>
            <section className="tiktok-video wrapper">
              <Flex justify='space-between'>
                <div style={{width: '50%'}}>
                  <h2>Наш TikTok <DoubleRightOutlined/></h2>
                  <p>Окунитесь в реальный процесс работы нашего склада и узнайте, как мы заботимся о ваших грузах! В
                    нашем
                    TikTok-канале Pekin Cargo 888 мы делимся короткими видео, которые показывают все этапы обработки
                    товаров
                    — от приема и сортировки до упаковки и отправки.</p>
                  <p> Каждое видео — это возможность увидеть нашу команду в действии, познакомиться с нашими
                    современными
                    складскими технологиями и убедиться в нашей надежности. Присоединяйтесь к нашему сообществу на
                    TikTok,
                    следите за обновлениями и будьте в курсе всех новостей и полезных советов по логистике и доставке из
                    Китая.</p>
                </div>
                <TikTok url={videoUrl}/>
              </Flex>
            </section>
            <ContactForm/>
            <FaqSection/>
          </Content>

          <Footer style={footerStyle}>
            <FooterSection/>
          </Footer>
        </Layout>
      </Flex>


    </ConfigProvider>
  );
}

export default App;
