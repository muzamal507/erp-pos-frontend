import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, InputNumber, message } from 'antd';
import { PlusOutlined, SearchOutlined, PrinterOutlined, DeleteOutlined } from '@ant-design/icons';

const CustomerReceivePaymentPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [receipts, setReceipts] = useState([
    { key: '1', ref: 'REC-2026-001', customer: 'Al-Madina Electronics', mode: 'Cash', amount: '45,000 PKR', date: '2026-10-06' },
    { key: '2', ref: 'REC-2026-002', customer: 'Hamza General Store', mode: 'Bank Transfer', amount: '12,500 PKR', date: '2026-10-05' },
  ]);

  const columns = [
    { title: 'Receipt #', dataIndex: 'ref', key: 'ref', width: 140 },
    { title: 'Customer Name', dataIndex: 'customer', key: 'customer' },
    { title: 'Payment Mode', dataIndex: 'mode', key: 'mode', width: 140, render: (m) => <Tag color="green">{m}</Tag> },
    { title: 'Received Amount', dataIndex: 'amount', key: 'amount', render: (val) => <b style={{ color: '#3f8600' }}>{val}</b> },
    { title: 'Date', dataIndex: 'date', key: 'date', width: 130 },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<PrinterOutlined />} style={{ padding: 0 }}>Print Slip</Button>
          <Button type="link" danger icon={<DeleteOutlined />} style={{ padding: 0 }}>Void</Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    message.success('Customer payment received and ledger updated!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Customer Receive Payments (Inflow)</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Receive Payment</Button>}
      >
        <Input placeholder="Search receipt or customer..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.rec-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={receipts} columns={columns} pagination={{ pageSize: 5 }} className="rec-table" scroll={{ x: 600 }} />
      </Card>

      <Modal title="Receive Payment From Customer" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="customer" label="Select Customer" rules={[{ required: true }]}>
            <Select size="large" placeholder="Choose customer">
              <Select.Option value="Al-Madina Electronics">Al-Madina Electronics (Bal: 45,000)</Select.Option>
              <Select.Option value="Hamza General Store">Hamza General Store (Bal: 12,500)</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Amount Received (PKR)" rules={[{ required: true }]}>
            <InputNumber size="large" style={{ width: '100%' }} placeholder="0.00" />
          </Form.Item>
          <Form.Item name="mode" label="Payment Mode" rules={[{ required: true }]}>
            <Select size="large" placeholder="Select mode">
              <Select.Option value="Cash">Cash (POS Drawer)</Select.Option>
              <Select.Option value="Bank Transfer">Bank Transfer / Cheque</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="remarks" label="Remarks / Cheque No"><Input.TextArea rows={2} placeholder="Optional notes..." /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save & Print</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerReceivePaymentPage;