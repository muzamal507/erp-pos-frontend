import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';

const VoucherTypesPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [vouchers, setVouchers] = useState([
    { key: '1', name: 'Cash Receipt Voucher', prefix: 'CR', status: 'Active' },
    { key: '2', name: 'Bank Payment Voucher', prefix: 'BP', status: 'Active' },
    { key: '3', name: 'Journal Voucher', prefix: 'JV', status: 'Active' },
  ]);

  const columns = [
    { title: 'Voucher Type Name', dataIndex: 'name', key: 'name' },
    { title: 'Prefix', dataIndex: 'prefix', key: 'prefix', width: 120, render: (p) => <Tag color="blue">{p}</Tag> },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 100, render: (s) => <Tag color="green">{s}</Tag> },
    { title: 'Action', key: 'action', render: () => <Button type="link" icon={<EditOutlined />} style={{ padding: 0 }}>Edit</Button> },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Voucher Types Configuration</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Voucher Type</Button>}
      >
        <Input placeholder="Search voucher..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <Table dataSource={vouchers} columns={columns} pagination={false} scroll={{ x: 500 }} />
      </Card>

      <Modal title="Add Voucher Type" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={() => { message.success('Voucher type added!'); setIsModalVisible(false); }} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Voucher Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Expense Voucher" /></Form.Item>
          <Form.Item name="prefix" label="Prefix Code" rules={[{ required: true }]}><Input size="large" placeholder="e.g. EV" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VoucherTypesPage;