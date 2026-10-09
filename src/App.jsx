import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.style.background = isDarkMode ? '#141414' : '#f5f5f5';
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: { colorPrimary: '#1890ff' },
      }}
    >
      <BrowserRouter>
        <AppRoutes isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;