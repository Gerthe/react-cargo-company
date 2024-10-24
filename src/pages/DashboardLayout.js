import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button, ConfigProvider, Layout } from 'antd';
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
  padding: '0 24px',
};
const contentStyle = {
  backgroundColor: '#fff',
  minHeight: 'calc(100vh - 110px)',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'var(--main)',
  height: 50,
  padding: '10px 20px',
};
const layoutStyle = {
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
          <div
            style={{
              overflowY: 'auto',
              height: '100%',
              padding: '0 24px 24px 24px',
            }}
          >
            <Outlet />
          </div>
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
    </ConfigProvider>
  );
};

export default DashboardLayout;
