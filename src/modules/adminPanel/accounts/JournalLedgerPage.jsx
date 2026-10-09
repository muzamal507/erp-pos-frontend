import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag } from 'antd';
import { SearchOutlined, PrinterOutlined } from '@ant-design/icons';

const JournalLedgerPage = () => {
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [journals, setJournals] = useState([
    { key: '1', date: '2026-10-06', ref: 'JV-001', account: 'Cash in POS Drawer', debit: '128,450', credit: '-', desc: 'Daily POS Sales Collection' },
    { key: '2', date: '2026-10-06', ref: 'JV-001', account: 'Sales Revenue Account', debit: '-', credit: '128,450', desc: 'Daily POS Sales Collection' },
  ]);

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date', width: 120 },
    { title: 'Voucher #', dataIndex: 'ref', key: 'ref', width: 100 },
    { title: 'Account Head', dataIndex: 'account', key: 'account' },
    { title: 'Debit (PKR)', dataIndex: 'debit', key: 'debit', render: (v) => <b style={{ color: '#3f8600' }}>{v}</b> },
    { title: 'Credit (PKR)', dataIndex: 'credit', key: 'credit', render: (v) => <b style={{ color: '#ff4d4f' }}>{v}</b> },
    { title: 'Description', dataIndex: 'desc', key: 'desc' },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Journal Ledger (Double-Entry Log)</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PrinterOutlined />} style={{ backgroundColor: '#1890ff' }}>Print Ledger</Button>}
      >
        <Input placeholder="Search journal entry..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.jl-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={journals} columns={columns} pagination={{ pageSize: 5 }} className="jl-table" scroll={{ x: 700 }} />
      </Card>
    </div>
  );
};

export default JournalLedgerPage;