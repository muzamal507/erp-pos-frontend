import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ExpenseCategoryPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [categories, setCategories] = useState([
    { key: '1', name: 'Utility Bills (Electricity/Gas)', code: 'EXP-CAT-01' },
    { key: '2', name: 'Shop Rent', code: 'EXP-CAT-02' },
    { key: '3', name: 'Staff Tea & Refreshment', code: 'EXP-CAT-03' },
  ]);

  const columns = [
    { title: 'Code', dataIndex: 'code', key: 'code', width: 150 },
    { title: 'Category Name', dataIndex: 'name', key: 'name' },
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
      <Card title={<span style={{ color: '#fff' }}>Expense Categories</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Category</Button>}
      >
        <Input placeholder="Search category..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <Table dataSource={categories} columns={columns} pagination={{ pageSize: 5 }} scroll={{ x: 500 }} />
      </Card>

      <Modal title="Add Expense Category" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={() => { message.success('Category added!'); setIsModalVisible(false); }}>
          <Form.Item name="name" label="Category Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Marketing & Ads" /></Form.Item>
          <Form.Item name="code" label="Category Code" rules={[{ required: true }]}><Input size="large" placeholder="e.g. EXP-CAT-04" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpenseCategoryPage;