import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const BranchPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [branches, setBranches] = useState([
    { key: '1', name: 'Main Head Office & Store', code: 'BR-001', city: 'Lahore', phone: '042-111222333' },
    { key: '2', name: 'Electronics Plaza Branch', code: 'BR-002', city: 'Faisalabad', phone: '041-55566677' },
  ]);

  const columns = [
    { title: 'Code', dataIndex: 'code', key: 'code', width: 100 },
    { title: 'Branch Name', dataIndex: 'name', key: 'name' },
    { title: 'City', dataIndex: 'city', key: 'city', width: 150 },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 150 },
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
    message.success('Branch added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Branches Management</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Branch</Button>}
      >
        <Input placeholder="Search branch..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.branch-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={branches} columns={columns} pagination={false} className="branch-table" scroll={{ x: 500 }} />
      </Card>

      <Modal title="Add New Branch" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Branch Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. City Center Branch" /></Form.Item>
          <Form.Item name="code" label="Branch Code" rules={[{ required: true }]}><Input size="large" placeholder="e.g. BR-003" /></Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Multan" /></Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}><Input size="large" placeholder="0300-0000000" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BranchPage;