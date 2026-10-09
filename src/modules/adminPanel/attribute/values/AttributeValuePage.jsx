import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const AttributeValuePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [attrValues, setAttrValues] = useState([
    { key: '1', attribute: 'Color', value: 'Royal Blue', code: 'COL-BLU' },
    { key: '2', attribute: 'Color', value: 'Jet Black', code: 'COL-BLK' },
    { key: '3', attribute: 'Storage', value: '128 GB', code: 'STR-128' },
  ]);

  const columns = [
    { title: 'Attribute', dataIndex: 'attribute', key: 'attribute', width: 150, render: (attr) => <Tag color="blue">{attr}</Tag> },
    { title: 'Value Name', dataIndex: 'value', key: 'value' },
    { title: 'Code', dataIndex: 'code', key: 'code', width: 120 },
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
    message.success('Attribute Value added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Attribute Values Management</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Value</Button>}
      >
        <Input placeholder="Search value..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.attrval-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={attrValues} columns={columns} pagination={{ pageSize: 5 }} className="attrval-table" scroll={{ x: 500 }} />
      </Card>

      <Modal title="Add Attribute Value" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="attribute" label="Select Attribute" rules={[{ required: true }]}>
            <Select size="large" placeholder="Choose attribute">
              <Select.Option value="Color">Color</Select.Option>
              <Select.Option value="Storage">Storage</Select.Option>
              <Select.Option value="Size">Size</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="value" label="Value Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Midnight Green" /></Form.Item>
          <Form.Item name="code" label="Value Code" rules={[{ required: true }]}><Input size="large" placeholder="e.g. COL-GRN" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AttributeValuePage;