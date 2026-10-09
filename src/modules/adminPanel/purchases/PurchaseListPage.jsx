import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';

const PurchaseListPage = () => {
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [purchases, setPurchases] = useState([
    { key: '1', poNo: 'PO-2026-055', supplier: 'Dawlance Pakistan', total: '450,000 PKR', status: 'Received' },
    { key: '2', poNo: 'PO-2026-056', supplier: 'Haier Electronics', total: '280,000 PKR', status: 'Ordered' },
  ]);

  const columns = [
    { title: 'PO #', dataIndex: 'poNo', key: 'poNo', width: 140 },
    { title: 'Supplier Name', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Total Amount', dataIndex: 'total', key: 'total', render: (val) => <b>{val}</b> },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 120, render: (s) => <Tag color={s === 'Received' ? 'green' : 'gold'}>{s}</Tag> },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} style={{ padding: 0 }}>View PO</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Purchase Orders List</span>} headStyle={cardHeadStyle} bordered={false}>
        <Input placeholder="Search PO or supplier..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.po-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={purchases} columns={columns} pagination={{ pageSize: 5 }} className="po-table" scroll={{ x: 500 }} />
      </Card>
    </div>
  );
};

export default PurchaseListPage;