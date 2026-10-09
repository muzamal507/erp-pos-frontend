import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Tabs, DatePicker, Statistic, Row, Col } from 'antd';
import { SearchOutlined, PrinterOutlined, FileExcelOutlined, BarChartOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const ReportsPage = () => {
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  // Sample Data for Product Reports
  const productData = [
    { key: '1', sku: 'ELC-001', name: 'LED Smart TV 43 Inch', sold: 45, stock: 12, revenue: '3,510,000 PKR' },
    { key: '2', sku: 'ELC-002', name: 'Inverter AC 1.5 Ton', sold: 28, stock: 5, revenue: '3,780,000 PKR' },
  ];

  // Sample Data for Profit & Loss
  const pnlData = [
    { key: '1', category: 'Gross Sales Revenue', amount: '7,290,000 PKR', type: 'Income' },
    { key: '2', category: 'Cost of Goods Sold (COGS)', amount: '5,400,000 PKR', type: 'Expense' },
    { key: '3', category: 'Operating Expenses (Rent/Bills)', amount: '62,500 PKR', type: 'Expense' },
    { key: '4', category: 'Net Profit', amount: '1,827,500 PKR', type: 'Profit' },
  ];

  // Columns Definitions
  const productColumns = [
    { title: 'SKU', dataIndex: 'sku', key: 'sku', width: 120 },
    { title: 'Product Name', dataIndex: 'name', key: 'name' },
    { title: 'Total Sold', dataIndex: 'sold', key: 'sold', width: 120, render: (s) => <Tag color="blue">{s} Units</Tag> },
    { title: 'Current Stock', dataIndex: 'stock', key: 'stock', width: 130, render: (s) => <Tag color="green">{s} Units</Tag> },
    { title: 'Total Revenue', dataIndex: 'revenue', key: 'revenue', render: (val) => <b style={{ color: '#3f8600' }}>{val}</b> },
  ];

  const pnlColumns = [
    { title: 'Particulars / Account Head', dataIndex: 'category', key: 'category' },
    { title: 'Type', dataIndex: 'type', key: 'type', width: 150, render: (t) => <Tag color={t === 'Profit' ? 'success' : 'processing'}>{t}</Tag> },
    { title: 'Amount (PKR)', dataIndex: 'amount', key: 'amount', render: (val) => <b style={{ fontSize: '15px' }}>{val}</b> },
  ];

  // Tab Items Mapping all 8 Report Types
  const reportTabs = [
    {
      key: '1',
      label: 'Product Reports',
      children: (
        <div>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <RangePicker size="large" />
            <Space>
              <Button icon={<FileExcelOutlined />} style={{ color: '#52c41a', borderColor: '#52c41a' }}>Export Excel</Button>
              <Button icon={<PrinterOutlined />}>Print Report</Button>
            </Space>
          </div>
          <Table dataSource={productData} columns={productColumns} pagination={{ pageSize: 5 }} scroll={{ x: 600 }} />
        </div>
      ),
    },
    {
      key: '2',
      label: 'Sales Reports',
      children: <div><Input placeholder="Search sales report..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" /><Table dataSource={[]} columns={productColumns} locale={{ emptyText: 'No sales records found for selected period.' }} /></div>,
    },
    {
      key: '3',
      label: 'Purchase Reports',
      children: <div><Input placeholder="Search purchase reports..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" /><Table dataSource={[]} columns={productColumns} locale={{ emptyText: 'No purchase records found.' }} /></div>,
    },
    {
      key: '4',
      label: 'GRN Reports',
      children: <div><RangePicker size="large" style={{ marginBottom: 16 }} /><Table dataSource={[]} columns={productColumns} locale={{ emptyText: 'No GRN records found.' }} /></div>,
    },
    {
      key: '5',
      label: 'Sale & Return Reports',
      children: <div><Input placeholder="Search returns..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" /><Table dataSource={[]} columns={productColumns} locale={{ emptyText: 'No returns recorded.' }} /></div>,
    },
    {
      key: '6',
      label: 'Party Reports',
      children: <div><Input placeholder="Search customer/supplier ledger..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" /><Table dataSource={[]} columns={productColumns} locale={{ emptyText: 'Select a party to view ledger.' }} /></div>,
    },
    {
      key: '7',
      label: 'Financial / Expense Reports',
      children: <div><RangePicker size="large" style={{ marginBottom: 16 }} /><Table dataSource={[]} columns={productColumns} locale={{ emptyText: 'No financial expense data found.' }} /></div>,
    },
    {
      key: '8',
      label: 'Profit & Loss Reports',
      children: (
        <div>
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={8}><Card bordered={false} style={{ background: '#f0f5ff' }}><Statistic title="Total Revenue" value="7,290,000 PKR" valueStyle={{ color: '#1890ff' }} /></Card></Col>
            <Col span={8}><Card bordered={false} style={{ background: 'fff1f0' }}><Statistic title="Total Expenses & COGS" value="5,462,500 PKR" valueStyle={{ color: '#ff4d4f' }} /></Card></Col>
            <Col span={8}><Card bordered={false} style={{ background: '#f6ffed' }}><Statistic title="Net Profit" value="1,827,500 PKR" valueStyle={{ color: '#52c41a' }} /></Card></Col>
          </Row>
          <Table dataSource={pnlData} columns={pnlColumns} pagination={false} scroll={{ x: 500 }} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}><BarChartOutlined /> Enterprise Business Intelligence & Reports</span>} headStyle={cardHeadStyle} bordered={false}>
        <Tabs defaultActiveKey="1" items={reportTabs} tabPosition="top" type="card" />
      </Card>
    </div>
  );
};

export default ReportsPage;