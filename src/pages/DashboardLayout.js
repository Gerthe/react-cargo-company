import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button, ConfigProvider, Flex, Layout } from 'antd';
import './DashboardLayout.css';
import { theme } from '../theme';
import { Helmet } from 'react-helmet';
import authApi from '../api/auth.api';

const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  height: 60,
  lineHeight: '30px',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
};
const contentStyle = {
  minHeight: 120,
  padding: '0 50px',
  marginTop: 40,
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'var(--main)',
  marginTop: 40,
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
};

const DashboardLayout = () => {
  const navigator = useNavigate();
  const isLogged = authApi.isLogged();

  const logout = () => {
    authApi.logout();
    navigator('/login');
  };

  return (
    <ConfigProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pekin Cargo 888</title>
        <link rel="canonical" href="http://CargoCompany/example" />
      </Helmet>

      <Flex gap="middle" wrap>
        <Layout>
          <Layout style={layoutStyle}>
            <Header style={headerStyle}>
              <div className="header-logo" style={{ position: 'relative' }}>
                <div className="header-logo__box" />
                <span>Pekin Cargo 888</span>
              </div>

              {isLogged && (
                <div>
                  <Button
                    ghost
                    onClick={logout}
                    style={{
                      margin: '14px 0',
                    }}
                  >
                    Выйти
                  </Button>
                </div>
              )}
            </Header>
            <Content style={contentStyle}>
              <Outlet />
            </Content>
            <Footer style={footerStyle}>
              <Link
                to="/"
                style={{
                  color: 'var(--accent)',
                }}
              >
                На Главную страницу
              </Link>
            </Footer>
          </Layout>
        </Layout>
      </Flex>
    </ConfigProvider>
  );
};

export default DashboardLayout;
