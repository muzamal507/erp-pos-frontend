import React from 'react';
import { Layout, Avatar, Dropdown, Switch, ConfigProvider, Button, Space, Tooltip, Grid, Divider } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  UserOutlined, LogoutOutlined, SunOutlined, MoonOutlined,
  ShoppingCartOutlined, UnorderedListOutlined, AppstoreOutlined, PauseCircleOutlined,
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

const quickLinks = [
  { key: '/pos',        label: 'POS Terminal', icon: <ShoppingCartOutlined />,  color: '#52c41a' },
  { key: '/sales',      label: 'Sale List',    icon: <UnorderedListOutlined />, color: '#1890ff' },
  { key: '/products',   label: 'Product List', icon: <AppstoreOutlined />,      color: '#722ed1' },
  { key: '/pos?hold=1', label: 'Hold List',    icon: <PauseCircleOutlined />,   color: '#fa8c16' },
];

const Header = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const userMenu = {
    items: [
      { key: '1', icon: <UserOutlined />, label: 'Profile' },
      { type: 'divider' },
      { key: '2', icon: <LogoutOutlined />, label: 'Logout', danger: true },
    ],
  };

  return (
    <AntHeader
      style={{
        padding: '0 16px',
        background: isDarkMode ? '#141414' : '#001529',
        borderBottom: isDarkMode ? '1px solid #303030' : 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 'clamp(14px, 2vw, 18px)', color: '#fff', whiteSpace: 'nowrap' }}>
        {isMobile ? 'ERP' : 'ERP & POS System'}
      </h3>

      {/* Right side: quick buttons + theme switch + user */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Space size={6}>
          {quickLinks.map((item) => {
            const active = !item.key.includes('?') && location.pathname === item.key;
            return (
              <Tooltip title={item.label} key={item.key}>
                <Button
                  size="small"
                  shape="circle"
                  icon={item.icon}
                  onClick={() => navigate(item.key)}
                  style={{
                    background: active ? item.color : 'transparent',
                    borderColor: item.color,
                    color: active ? '#fff' : item.color,
                  }}
                />
              </Tooltip>
            );
          })}
        </Space>

        <Divider type="vertical" style={{ borderColor: 'rgba(255,255,255,0.3)', margin: 0 }} />

        <ConfigProvider
          theme={{
            components: {
              Switch: {
                colorPrimary: '#faad14',
                colorPrimaryHover: '#ffc53d',
                colorTextQuaternary: '#8c8c8c',
                colorTextTertiary: '#a6a6a6',
              },
            },
          }}
        >
          <Switch
            checked={isDarkMode}
            onChange={setIsDarkMode}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </ConfigProvider>

        <Dropdown menu={userMenu} placement="bottomRight" arrow>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar size="small" style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
            {!isMobile && <span style={{ fontWeight: 500, color: '#fff' }}>Super Admin</span>}
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;