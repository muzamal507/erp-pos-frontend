import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag } from 'antd';
import { SearchOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';

const SaleListPage = () => {
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [sales, setSales] = useState([
    { key: '1', invoiceNo: 'INV-2026-001', customer: 'Walk-in Customer', items: 3, total: '85,000 PKR', payment: 'Cash', status: 'Completed' },
    { key: '2', invoiceNo: 'INV-2026-002', customer: 'Al-Madina Electronics', items: 1, total: '135,000 PKR', payment: 'Credit', status: 'Pending' },
  ]);

  const columns = [
    { title: 'Invoice #', dataIndex: 'invoiceNo', key: 'invoiceNo', width: 140 },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Items', dataIndex: 'items', key: 'items', width: 80 },
    { title: 'Total Amount', dataIndex: 'total', key: 'total', render: (val) => <b style={{ color: '#3f8600' }}>{val}</b> },
    { title: 'Payment', dataIndex: 'payment', key: 'payment', width: 100, render: (p) => <Tag color={p === 'Cash' ? 'green' : 'orange'}>{p}</Tag> },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 100, render: (s) => <Tag color={s === 'Completed' ? 'blue' : 'volcano'}>{s}</Tag> },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} style={{ padding: 0 }}>View</Button>
          <Button type="link" icon={<PrinterOutlined />} style={{ padding: 0 }}>Print</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Sales Invoices List</span>} headStyle={cardHeadStyle} bordered={false}>
        <Input placeholder="Search invoice or customer..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.sale-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={sales} columns={columns} pagination={{ pageSize: 5 }} className="sale-table" scroll={{ x: 600 }} />
      </Card>
    </div>
  );
};

export default SaleListPage;