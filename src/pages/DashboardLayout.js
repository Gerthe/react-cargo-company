import React from 'react';
import { Outlet } from 'react-router-dom';
import { Flex, Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  height: 64,
  lineHeight: '30px',
  color: '#fff',
};
const contentStyle = {
  minHeight: 120,
  lineHeight: '120px',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#072e60',
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
};

const DashboardLayout = () => {
  return (
    <Flex gap="middle" wrap>
      <Layout>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <h1>Dashboard Layout</h1>
          </Header>
          <Content style={contentStyle}>
            <Outlet />
          </Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default DashboardLayout;
