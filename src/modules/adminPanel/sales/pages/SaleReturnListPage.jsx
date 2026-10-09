import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';

const SaleReturnListPage = () => {
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [returns, setReturns] = useState([
    { key: '1', returnNo: 'RET-2026-001', origInvoice: 'INV-2026-001', customer: 'Walk-in Customer', refund: '5,000 PKR', status: 'Refunded' },
  ]);

  const columns = [
    { title: 'Return #', dataIndex: 'returnNo', key: 'returnNo', width: 130 },
    { title: 'Original Inv #', dataIndex: 'origInvoice', key: 'origInvoice', width: 140 },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Refund Amount', dataIndex: 'refund', key: 'refund', render: (val) => <b style={{ color: '#ff4d4f' }}>{val}</b> },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 110, render: (s) => <Tag color="volcano">{s}</Tag> },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} style={{ padding: 0 }}>View Slip</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Sale Return & Refund List</span>} headStyle={cardHeadStyle} bordered={false}>
        <Input placeholder="Search return or invoice..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.ret-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={returns} columns={columns} pagination={{ pageSize: 5 }} className="ret-table" scroll={{ x: 600 }} />
      </Card>
    </div>
  );
};

export default SaleReturnListPage;