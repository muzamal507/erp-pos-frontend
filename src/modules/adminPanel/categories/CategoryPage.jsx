import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const cardHeadStyle = {
    backgroundColor: '#001529',
    color: '#fff',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  };

  const [categories, setCategories] = useState([
    { key: '1', name: 'Electronics', code: 'CAT-01', status: 'Active' },
    { key: '2', name: 'Home Appliances', code: 'CAT-02', status: 'Active' },
    { key: '3', name: 'Kitchenware', code: 'CAT-03', status: 'Active' },
  ]);

  const columns = [
    { title: 'Category Code', dataIndex: 'code', key: 'code', width: 150 },
    { title: 'Category Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color="green">{status}</Tag> },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} style={{ padding: 0 }}>Edit</Button>
          <Button type="link" danger icon={<DeleteOutlined />} style={{ padding: 0 }}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleAdd = (values) => {
    message.success('Category added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card 
        title={<span style={{ color: '#fff' }}>Product Categories</span>} 
        headStyle={cardHeadStyle} 
        bordered={false}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>
            Add Category
          </Button>
        }
      >
        <Input placeholder="Search category..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        
        <style>{`
          .cat-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }
        `}</style>

        <Table dataSource={categories} columns={columns} pagination={{ pageSize: 5 }} className="cat-table" scroll={{ x: 500 }} />
      </Card>

      <Modal title="Add New Category" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
            <Input size="large" placeholder="e.g. Mobile Accessories" />
          </Form.Item>
          <Form.Item name="code" label="Category Code" rules={[{ required: true }]}>
            <Input size="large" placeholder="e.g. CAT-04" />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryPage;