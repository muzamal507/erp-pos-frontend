import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const AccountGroupsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [groups, setGroups] = useState([
    { key: '1', name: 'Current Assets', type: 'Asset', code: '100', status: 'Active' },
    { key: '2', name: 'Current Liabilities', type: 'Liability', code: '200', status: 'Active' },
    { key: '3', name: 'Operating Expenses', type: 'Expense', code: '300', status: 'Active' },
  ]);

  const columns = [
    { title: 'Group Code', dataIndex: 'code', key: 'code', width: 120 },
    { title: 'Group Name', dataIndex: 'name', key: 'name' },
    { title: 'Nature / Type', dataIndex: 'type', key: 'type', width: 140, render: (t) => <Tag color="purple">{t}</Tag> },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 100, render: (s) => <Tag color="green">{s}</Tag> },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} style={{ padding: 0 }}>Edit</Button>
          <Button type="link" danger icon={<DeleteOutlined />} style={{ padding: 0 }}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Account Groups Management</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Group</Button>}
      >
        <Input placeholder="Search account group..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.grp-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={groups} columns={columns} pagination={{ pageSize: 5 }} className="grp-table" scroll={{ x: 500 }} />
      </Card>

      <Modal title="Add Account Group" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={() => { message.success('Group added!'); setIsModalVisible(false); }} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Group Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Bank Accounts" /></Form.Item>
          <Form.Item name="code" label="Group Code" rules={[{ required: true }]}><Input size="large" placeholder="e.g. 105" /></Form.Item>
          <Form.Item name="type" label="Nature Type" rules={[{ required: true }]}>
            <Select size="large" placeholder="Select nature">
              <Select.Option value="Asset">Asset</Select.Option>
              <Select.Option value="Liability">Liability</Select.Option>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save Group</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountGroupsPage;