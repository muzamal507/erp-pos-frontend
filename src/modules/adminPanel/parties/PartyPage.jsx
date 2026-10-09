import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';

const PartyPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [parties, setParties] = useState([
    { key: '1', name: 'Al-Madina Electronics', type: 'Customer', phone: '0300-1234567', city: 'Lahore', balance: '45,000 (Dr)' },
    { key: '2', name: 'Dawlance Distributors', type: 'Supplier', phone: '042-9988776', city: 'Karachi', balance: '120,000 (Cr)' },
  ]);

  const columns = [
    { title: 'Party Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type', width: 110, render: (t) => <Tag color={t === 'Customer' ? 'green' : 'volcano'}>{t}</Tag> },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 140 },
    { title: 'City', dataIndex: 'city', key: 'city', width: 120 },
    { title: 'Balance', dataIndex: 'balance', key: 'balance', width: 130, render: (b) => <b style={{ color: '#1890ff' }}>{b}</b> },
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

  const handleAdd = () => {
    message.success('Party added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Parties Management (Customers & Suppliers)</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Party</Button>}
      >
        <Input placeholder="Search party by name or phone..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.party-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={parties} columns={columns} pagination={{ pageSize: 5 }} className="party-table" scroll={{ x: 600 }} />
      </Card>

      <Modal title="Add New Party" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Party Name / Company" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Al-Madina Electronics" /></Form.Item>
          <Form.Item name="type" label="Party Type" rules={[{ required: true }]}>
            <Select size="large" placeholder="Select type">
              <Select.Option value="Customer">Customer</Select.Option>
              <Select.Option value="Supplier">Supplier</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}><Input size="large" placeholder="0300-0000000" /></Form.Item>
          <Form.Item name="city" label="City"><Input size="large" placeholder="e.g. Faisalabad" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PartyPage;