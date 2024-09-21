import React from 'react';
import { Flex, ConfigProvider, Layout } from 'antd';
import { Helmet } from 'react-helmet';
import { footerStyle, headerStyle, theme } from '../../theme';
import HeaderSection from './HeaderSection';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import AdvantagesSection from './AdvantagesSection';
import VideoSection from './VideoSection';
import ContactForm from './ContactForm';
import MarketplacesSection from './MarketplacesSection';
import FaqSection from './FaqSection';
import FooterSection from './FooterSection';
import { Content, Footer, Header } from 'antd/es/layout/layout';

const LandingPage = () => {
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
};

export default LandingPage;
