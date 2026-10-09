import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const WarehousePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [warehouses, setWarehouses] = useState([
    { key: '1', name: 'Main Godown (Basement)', code: 'WH-01', branch: 'Main Head Office', type: 'Warehouse' },
    { key: '2', name: 'Counter 1 (Retail Billing)', code: 'CTR-01', branch: 'Main Head Office', type: 'POS Counter' },
  ]);

  const columns = [
    { title: 'Code', dataIndex: 'code', key: 'code', width: 100 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Branch', dataIndex: 'branch', key: 'branch' },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (t) => <Tag color={t === 'Warehouse' ? 'purple' : 'geekblue'}>{t}</Tag> },
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
    message.success('Warehouse/Counter added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Warehouses & POS Counters</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Warehouse/Counter</Button>}
      >
        <Input placeholder="Search storage/counter..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.wh-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={warehouses} columns={columns} pagination={false} className="wh-table" scroll={{ x: 500 }} />
      </Card>

      <Modal title="Add Warehouse or Counter" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Counter 2" /></Form.Item>
          <Form.Item name="code" label="Code" rules={[{ required: true }]}><Input size="large" placeholder="e.g. CTR-02" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WarehousePage;