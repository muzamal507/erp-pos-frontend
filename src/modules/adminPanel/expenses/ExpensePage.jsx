import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';

const ExpensePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [expenses, setExpenses] = useState([
    { key: '1', category: 'Electricity Bill', amount: '12,500 PKR', date: '2026-10-04', note: 'September Bill' },
    { key: '2', category: 'Shop Rent', amount: '50,000 PKR', date: '2026-10-01', note: 'Advance Rent' },
  ]);

  const columns = [
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (val) => <b style={{ color: '#ff4d4f' }}>{val}</b> },
    { title: 'Date', dataIndex: 'date', key: 'date', width: 130 },
    { title: 'Remarks / Note', dataIndex: 'note', key: 'note' },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} style={{ padding: 0 }}>Edit</Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    message.success('Expense recorded successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Expense Management</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Expense</Button>}
      >
        <Input placeholder="Search expense..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.exp-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={expenses} columns={columns} pagination={{ pageSize: 5 }} className="exp-table" scroll={{ x: 500 }} />
      </Card>

      <Modal title="Record New Expense" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="category" label="Expense Category" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Utility Bills / Office Supplies" /></Form.Item>
          <Form.Item name="amount" label="Amount (PKR)" rules={[{ required: true }]}><Input size="large" placeholder="0.00" /></Form.Item>
          <Form.Item name="note" label="Remarks"><Input.TextArea rows={3} placeholder="Optional details..." /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save Expense</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpensePage;