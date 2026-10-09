import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const BrandPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [brands, setBrands] = useState([
    { key: '1', name: 'Samsung', code: 'BRD-01', status: 'Active' },
    { key: '2', name: 'Dawlance', code: 'BRD-02', status: 'Active' },
    { key: '3', name: 'Haier', code: 'BRD-03', status: 'Active' },
  ]);

  const columns = [
    { title: 'Brand Code', dataIndex: 'code', key: 'code', width: 150 },
    { title: 'Brand Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color="blue">{status}</Tag> },
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
    message.success('Brand added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Product Brands</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Brand</Button>}
      >
        <Input placeholder="Search brand..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.brand-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={brands} columns={columns} pagination={{ pageSize: 5 }} className="brand-table" scroll={{ x: 500 }} />
      </Card>

      <Modal title="Add New Brand" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Brand Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Sony" /></Form.Item>
          <Form.Item name="code" label="Brand Code" rules={[{ required: true }]}><Input size="large" placeholder="e.g. BRD-04" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandPage;