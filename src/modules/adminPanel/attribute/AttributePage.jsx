import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const AttributePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [attributes, setAttributes] = useState([
    { key: '1', name: 'Color', values: 'Red, Blue, Black, Silver' },
    { key: '2', name: 'Storage', values: '64GB, 128GB, 256GB' },
    { key: '3', name: 'Size', values: 'Small, Medium, Large' },
  ]);

  const columns = [
    { title: 'Attribute Name', dataIndex: 'name', key: 'name', width: 200 },
    { title: 'Attribute Values', dataIndex: 'values', key: 'values', render: (vals) => (
      vals.split(', ').map((v, i) => <Tag color="cyan" key={i} style={{ marginBottom: 4 }}>{v}</Tag>)
    )},
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
    message.success('Attribute added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Product Attributes & Values</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Attribute</Button>}
      >
        <Input placeholder="Search attribute..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.attr-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={attributes} columns={columns} pagination={{ pageSize: 5 }} className="attr-table" scroll={{ x: 500 }} />
      </Card>

      <Modal title="Add Product Attribute" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Attribute Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. RAM" /></Form.Item>
          <Form.Item name="values" label="Values (Comma Separated)" rules={[{ required: true }]}><Input size="large" placeholder="e.g. 4GB, 8GB, 16GB" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AttributePage;