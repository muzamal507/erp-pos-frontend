import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';

const GrnListPage = () => {
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [grns, setGrns] = useState([
    { key: '1', grnNo: 'GRN-2026-012', poNo: 'PO-2026-055', warehouse: 'Main Godown', itemsCount: 15, date: '2026-10-05' },
  ]);

  const columns = [
    { title: 'GRN #', dataIndex: 'grnNo', key: 'grnNo', width: 140 },
    { title: 'Ref PO #', dataIndex: 'poNo', key: 'poNo', width: 140 },
    { title: 'Warehouse', dataIndex: 'warehouse', key: 'warehouse' },
    { title: 'Items Count', dataIndex: 'itemsCount', key: 'itemsCount', width: 110, render: (c) => <Tag color="blue">{c} Units</Tag> },
    { title: 'Received Date', dataIndex: 'date', key: 'date', width: 130 },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} style={{ padding: 0 }}>View GRN</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Goods Receipt Notes (GRN)</span>} headStyle={cardHeadStyle} bordered={false}>
        <Input placeholder="Search GRN or PO..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.grn-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={grns} columns={columns} pagination={{ pageSize: 5 }} className="grn-table" scroll={{ x: 600 }} />
      </Card>
    </div>
  );
};

export default GrnListPage;