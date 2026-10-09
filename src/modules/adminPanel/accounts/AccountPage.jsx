import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons';

const AccountPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [accounts, setAccounts] = useState([
    { key: '1', code: '1010-01', name: 'Meezan Bank Current A/C', group: 'Current Assets', balance: '1,450,000 PKR' },
    { key: '2', code: '1010-02', name: 'Cash in POS Drawer', group: 'Current Assets', balance: '128,450 PKR' },
  ]);

  const columns = [
    { title: 'Code', dataIndex: 'code', key: 'code', width: 130 },
    { title: 'Account Name', dataIndex: 'name', key: 'name' },
    { title: 'Account Group', dataIndex: 'group', key: 'group' },
    { title: 'Balance', dataIndex: 'balance', key: 'balance', render: (b) => <b style={{ color: '#1890ff' }}>{b}</b> },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<FileTextOutlined />} style={{ padding: 0 }}>Ledger</Button>
          <Button type="link" icon={<EditOutlined />} style={{ padding: 0 }}>Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Chart of Accounts</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Account</Button>}
      >
        <Input placeholder="Search account..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.acc-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={accounts} columns={columns} pagination={{ pageSize: 5 }} className="acc-table" scroll={{ x: 600 }} />
      </Card>

      <Modal title="Create Ledger Account" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={() => { message.success('Account created!'); setIsModalVisible(false); }} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Account Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Petty Cash Box" /></Form.Item>
          <Form.Item name="code" label="Account Code" rules={[{ required: true }]}><Input size="large" placeholder="e.g. 1010-03" /></Form.Item>
          <Form.Item name="group" label="Account Group" rules={[{ required: true }]}>
            <Select size="large" placeholder="Select group">
              <Select.Option value="Current Assets">Current Assets</Select.Option>
              <Select.Option value="Current Liabilities">Current Liabilities</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save Account</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountPage;