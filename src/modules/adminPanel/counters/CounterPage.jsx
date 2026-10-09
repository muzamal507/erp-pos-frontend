import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CounterPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [counters, setCounters] = useState([
    { key: '1', name: 'Counter 01 (Main Hall)', code: 'CTR-01', cashier: 'Ali Raza', status: 'Active' },
    { key: '2', name: 'Counter 02 (Appliance Section)', code: 'CTR-02', cashier: 'Usman Khan', status: 'Active' },
  ]);

  const columns = [
    { title: 'Code', dataIndex: 'code', key: 'code', width: 100 },
    { title: 'Counter Name', dataIndex: 'name', key: 'name' },
    { title: 'Assigned Cashier', dataIndex: 'cashier', key: 'cashier' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => <Tag color="green">{s}</Tag> },
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

  const handleAdd = () => {
    message.success('Counter added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>POS Counters Management</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Counter</Button>}
      >
        <Input placeholder="Search counter..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.counter-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={counters} columns={columns} pagination={false} className="counter-table" scroll={{ x: 500 }} />
      </Card>

      <Modal title="Add New POS Counter" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Counter Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Counter 3" /></Form.Item>
          <Form.Item name="code" label="Counter Code" rules={[{ required: true }]}><Input size="large" placeholder="e.g. CTR-03" /></Form.Item>
          <Form.Item name="cashier" label="Assigned Cashier"><Input size="large" placeholder="e.g. Ahmed Ali" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CounterPage;