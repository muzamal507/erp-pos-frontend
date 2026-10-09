import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';

const LocationPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [locations, setLocations] = useState([
    { key: '1', name: 'Main Head Office & Godown', city: 'Lahore', manager: 'Tahir Ahmed', status: 'Active' },
    { key: '2', name: 'Faisalabad Branch Store', city: 'Faisalabad', manager: 'Usman Ali', status: 'Active' },
  ]);

  const columns = [
    { title: 'Location Name', dataIndex: 'name', key: 'name' },
    { title: 'City', dataIndex: 'city', key: 'city', width: 150 },
    { title: 'Incharge / Manager', dataIndex: 'manager', key: 'manager' },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 100, render: (s) => <Tag color="green">{s}</Tag> },
    { title: 'Action', key: 'action', render: () => <Button type="link" icon={<EditOutlined />} style={{ padding: 0 }}>Edit</Button> },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Locations & Store Branches</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Location</Button>}
      >
        <Input placeholder="Search location..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <Table dataSource={locations} columns={columns} pagination={false} scroll={{ x: 600 }} />
      </Card>

      <Modal title="Add New Location / Branch" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={() => { message.success('Location added!'); setIsModalVisible(false); }}>
          <Form.Item name="name" label="Location Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Islamabad Outlet" /></Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true }]}><Input size="large" placeholder="Islamabad" /></Form.Item>
          <Form.Item name="manager" label="Manager Name"><Input size="large" placeholder="Manager full name" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LocationPage;