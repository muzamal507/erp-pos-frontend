import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined, ShoppingCartOutlined, AppstoreOutlined, ShopOutlined,
  TeamOutlined, FileTextOutlined, SettingOutlined, TagsOutlined,
  ApartmentOutlined, GoldOutlined, DollarOutlined, UnorderedListOutlined,
  RollbackOutlined, WalletOutlined, BarChartOutlined, EnvironmentOutlined,
  UserOutlined, ProfileOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed, isDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getOpenGroupKey = (pathname) => {
    if (['/pos', '/sales', '/sale-returns'].includes(pathname)) return ['/sales-group'];
    if (['/products', '/categories', '/brands', '/attributes', '/attribute-values', '/warehouses', '/counters'].includes(pathname)) return ['/products-group'];
    if (['/purchases', '/grns'].includes(pathname)) return ['/purchases-group'];
    if (['/parties', '/locations'].includes(pathname)) return ['/parties-group'];
    if (['/expenses', '/expenses-category'].includes(pathname)) return ['/expenses-group'];
    if (['/account-groups', '/accounts', '/voucher-types', '/fiscal-years', '/journal-ledger', '/customer-receive-payment', '/supplier-payment', '/cash-closings'].includes(pathname)) return ['/accounts-group'];
    if (pathname.startsWith('/reports')) return ['/reports-group'];
    return [];
  };

  const [openKeys, setOpenKeys] = useState(getOpenGroupKey(location.pathname));

  useEffect(() => {
    setOpenKeys(getOpenGroupKey(location.pathname));
  }, [location.pathname]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const menuItems = [
    { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
    {
      key: '/sales-group', icon: <ShoppingCartOutlined />, label: 'Sales & POS',
      children: [
        { key: '/pos', icon: <ShoppingCartOutlined />, label: 'POS Terminal' },
        { key: '/sales', icon: <UnorderedListOutlined />, label: 'Sale List' },
        { key: '/sale-returns', icon: <RollbackOutlined />, label: 'Sale Return List' },
      ],
    },
    {
      key: '/products-group', icon: <AppstoreOutlined />, label: 'Products & Inventory',
      children: [
        { key: '/products', icon: <AppstoreOutlined />, label: 'All Products' },
        { key: '/categories', icon: <TagsOutlined />, label: 'Categories' },
        { key: '/brands', icon: <GoldOutlined />, label: 'Brands' },
        { key: '/attributes', icon: <ApartmentOutlined />, label: 'Attributes' },
        { key: '/attribute-values', icon: <ApartmentOutlined />, label: 'Attribute Values' },
        { key: '/branches', icon: <ShopOutlined />, label: 'Branches' },
        { key: '/warehouses', icon: <ShopOutlined />, label: 'Warehouses' },
        { key: '/counters', icon: <ShopOutlined />, label: 'POS Counters' },
      ],
    },
    {
      key: '/purchases-group', icon: <ShopOutlined />, label: 'Purchase & GRN',
      children: [
        { key: '/purchases', icon: <ShopOutlined />, label: 'Purchase List (PO)' },
        { key: '/grns', icon: <FileTextOutlined />, label: 'GRN List' },
      ],
    },
    {
      key: '/parties-group', icon: <TeamOutlined />, label: 'Customers & Parties',
      children: [
        { key: '/parties', icon: <UserOutlined />, label: 'Parties' },
        { key: '/locations', icon: <EnvironmentOutlined />, label: 'Locations' },
      ],
    },
    {
      key: '/expenses-group', icon: <WalletOutlined />, label: 'Expenses',
      children: [
        { key: '/expenses', icon: <WalletOutlined />, label: 'Expense List' },
        { key: '/expenses-category', icon: <ProfileOutlined />, label: 'Expense Categories' },
      ],
    },
    {
      key: '/accounts-group', icon: <FileTextOutlined />, label: 'Account',
      children: [
        { key: '/account-groups', label: 'Account Groups' },
        { key: '/accounts', label: 'Accounts' },
        { key: '/voucher-types', label: 'Voucher Types' },
        { key: '/fiscal-years', label: 'Fiscal Years' },
        { key: '/journal-ledger', label: 'Journal Ledger' },
        { key: '/customer-receive-payment', label: 'Customer Receive Payment' },
        { key: '/supplier-payment', label: 'Supplier Payment' },
        { key: '/cash-closings', label: 'Cash Closing' },
      ],
    },
    { key: '/payroll', icon: <DollarOutlined />, label: 'Payroll' },
    {
      key: '/reports-group', icon: <BarChartOutlined />, label: 'Reports & Analytics',
      children: [
        { key: '/reports/products', label: 'Product Reports' },
        { key: '/reports/sales', label: 'Sales Reports' },
        { key: '/reports/purchases', label: 'Purchase Reports' },
        { key: '/reports/grn', label: 'GRN Reports' },
        { key: '/reports/sales-return', label: 'Sale & Return Reports' },
        { key: '/reports/parties', label: 'Party Reports' },
        { key: '/reports/financial', label: 'Financial/Expense Reports' },
        { key: '/reports/pnl', label: 'Profit & Loss Reports' },
      ],
    },
    { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
  ];

  const sidebarTheme = isDarkMode ? 'dark' : 'light';

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="dark"
      style={{ background: isDarkMode ? '#141414' : '#001529' }}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        {collapsed ? 'ERP' : 'Tahir Electronics'}
      </div>
      <Menu
        theme="dark"
        selectedKeys={[location.pathname]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ background: 'transparent' }}
      />
    </Sider>
  );
};

export default Sidebar;