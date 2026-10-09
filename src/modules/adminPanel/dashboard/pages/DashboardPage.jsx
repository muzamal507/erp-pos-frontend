import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Typography, Progress, theme } from 'antd';
import { DollarOutlined, TeamOutlined, WarningOutlined, ArrowUpOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DashboardPage = () => {
  const { token } = theme.useToken();

  // Dark header style for cards (headStyle ki jagah styles.header)
  const cardHeaderStyles = {
    header: {
      backgroundColor: '#001529',
      color: '#fff',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
    },
  };

  const statCardStyle = (color) => ({
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
    borderLeft: `4px solid ${color}`,
  });

  const duesColumns = [
    { title: 'Party Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Type', dataIndex: 'type', key: 'type',
      render: (type) => <Tag color={type === 'Customer' ? 'green' : 'volcano'}>{type}</Tag>,
    },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Balance (PKR)', dataIndex: 'balance', key: 'balance',
      render: (val) => <span style={{ fontWeight: 'bold', color: '#ff4d4f' }}>{val}</span>,
    },
  ];

  const duesData = [
    { key: '1', name: 'Al-Madina Electronics', type: 'Customer', phone: '0300-1234567', balance: '45,000' },
    { key: '2', name: 'ismillah Traders (Supplier)', type: 'Supplier', phone: '0321-9876543', balance: '120,000' },
    { key: '3', name: 'Hamza General Store', type: 'Customer', phone: '0312-5554433', balance: '12,500' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={3} style={{ margin: 0 }}>Dashboard Overview</Title>
        <Text type="secondary">Welcome back, Super Admin. Here is what's happening today.</Text>
      </div>

      {/* Row 1: Statistic Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" style={statCardStyle('#1890ff')}>
            <Statistic
              title="Today's Sales"
              value={128450}
              precision={2}
              valueStyle={{ color: '#3f8600', fontWeight: 'bold' }}
              prefix="PKR "
              suffix={<ArrowUpOutlined />}
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>12% higher than yesterday</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" style={statCardStyle('#52c41a')}>
            <Statistic
              title="Total Purchases"
              value={450000}
              precision={2}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
              prefix="PKR "
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>This month GRN total</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" style={statCardStyle('#faad14')}>
            <Statistic
              title="Party Dues (Receivable)"
              value={57500}
              precision={2}
              valueStyle={{ color: '#faad14', fontWeight: 'bold' }}
              prefix="PKR "
              suffix={<TeamOutlined />}
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>Pending from customers</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" style={statCardStyle('#ff4d4f')}>
            <Statistic
              title="Low Stock Items"
              value={8}
              valueStyle={{ color: '#ff4d4f', fontWeight: 'bold' }}
              prefix={<WarningOutlined />}
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>Requires immediate reorder</Text>
          </Card>
        </Col>
      </Row>

      {/* Row 2: Graphical Analytics & Stock Health */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={16}>
          <Card
            title={<span style={{ color: '#fff' }}>Sales & Revenue Analytics (Weekly)</span>}
            styles={cardHeaderStyles}
            variant="borderless"
          >
            <div
              style={{
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: token.colorFillAlter,
                borderRadius: '8px',
                border: `1px dashed ${token.colorBorder}`,
              }}
            >
              <DollarOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '10px' }} />
              <Text strong>Interactive Sales Graph Area</Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>(Integration ready for Recharts / Chart.js)</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={<span style={{ color: '#fff' }}>Warehouse Stock Health</span>}
            styles={cardHeaderStyles}
            variant="borderless"
          >
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <Text>Electronics & Gadgets</Text>
                <Text strong>78%</Text>
              </div>
              <Progress percent={78} status="active" strokeColor="#52c41a" />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <Text>Home Appliances</Text>
                <Text strong>45%</Text>
              </div>
              <Progress percent={45} status="active" strokeColor="#1890ff" />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <Text>Mobile Accessories</Text>
                <Text strong>25%</Text>
              </div>
              <Progress percent={25} status="exception" />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Row 3: Party Dues Table */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24}>
          <Card
            title={<span style={{ color: token.colorText }}>Top Party Dues & Ledger Balances</span>}
            variant="borderless"
          >
            <style>
              {`
                .dark-header-table .ant-table-thead > tr > th {
                  background-color: #001529 !important;
                  color: #fff !important;
                  font-weight: bold;
                }
              `}
            </style>
            <Table
              dataSource={duesData}
              columns={duesColumns}
              pagination={false}
              size="middle"
              scroll={{ x: 500 }}
              className="dark-header-table"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;