import './App.css';
import { Helmet } from 'react-helmet';
import { ConfigProvider, Flex, Layout } from 'antd';
import HeroSection from './components/HeroSection';
import HeaderSection from './components/HeaderSection';
import ServicesSection from './components/ServicesSection';
import AdvantagesSection from './components/AdvantagesSection';
import { footerStyle, headerStyle, theme } from './theme';
import ContactForm from './components/ContactForm';
import FaqSection from './components/FaqSection';
import FooterSection from './components/FooterSection';
import VideoSection from './components/VideoSection';
import MarketplacesSection from './components/MarketplacesSection';
import React from 'react';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pekin Cargo 888</title>
        <link rel="canonical" href="http://CargoCompany/example" />
      </Helmet>

      <Flex gap="middle" wrap>
        <Layout>
          <Header style={headerStyle}>
            <HeaderSection />
          </Header>

          <Content>
            <HeroSection />
            <ServicesSection />
            <AdvantagesSection />
            <VideoSection />
            <ContactForm />
            <MarketplacesSection />
            <FaqSection />
          </Content>

          <Footer style={footerStyle}>
            <FooterSection />
          </Footer>
        </Layout>
      </Flex>
    </ConfigProvider>
  );
}

export default App;
