import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const MainLayout = ({ children, isDarkMode, setIsDarkMode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isDarkMode={isDarkMode}
      />

      <Layout>
        <Header
          colorBgContainer={colorBgContainer}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        <Content style={{ margin: '12px' }}>
          <div
            style={{
              padding: '16px',
              minHeight: 'calc(100vh - 140px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowX: 'auto',
            }}
          >
            {children}
          </div>
        </Content>

        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;