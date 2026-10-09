import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, InputNumber, message } from 'antd';
import { PlusOutlined, SearchOutlined, PrinterOutlined, DeleteOutlined } from '@ant-design/icons';

const SupplierPaymentPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [payments, setPayments] = useState([
    { key: '1', ref: 'PAY-2026-001', supplier: 'Dawlance Distributors', mode: 'Bank Transfer', amount: '120,000 PKR', date: '2026-10-05' },
  ]);

  const columns = [
    { title: 'Payment #', dataIndex: 'ref', key: 'ref', width: 140 },
    { title: 'Supplier Name', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Payment Mode', dataIndex: 'mode', key: 'mode', width: 140, render: (m) => <Tag color="volcano">{m}</Tag> },
    { title: 'Paid Amount', dataIndex: 'amount', key: 'amount', render: (val) => <b style={{ color: '#ff4d4f' }}>{val}</b> },
    { title: 'Date', dataIndex: 'date', key: 'date', width: 130 },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<PrinterOutlined />} style={{ padding: 0 }}>Print Voucher</Button>
          <Button type="link" danger icon={<DeleteOutlined />} style={{ padding: 0 }}>Void</Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    message.success('Supplier payment recorded successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Supplier Payments (Outflow)</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Pay Supplier</Button>}
      >
        <Input placeholder="Search payment or supplier..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.pay-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={payments} columns={columns} pagination={{ pageSize: 5 }} className="pay-table" scroll={{ x: 600 }} />
      </Card>

      <Modal title="Pay To Supplier" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <Form.Item name="supplier" label="Select Supplier" rules={[{ required: true }]}>
            <Select size="large" placeholder="Choose supplier">
              <Select.Option value="Dawlance Distributors">Dawlance Distributors (Due: 120,000)</Select.Option>
              <Select.Option value="Haier Pakistan">Haier Pakistan (Due: 280,000)</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Payment Amount (PKR)" rules={[{ required: true }]}>
            <InputNumber size="large" style={{ width: '100%' }} placeholder="0.00" />
          </Form.Item>
          <Form.Item name="mode" label="Payment Mode" rules={[{ required: true }]}>
            <Select size="large" placeholder="Select mode">
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Bank Transfer">Bank Transfer / Online</Select.Option>
              <Select.Option value="Cheque">Cheque</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="remarks" label="Remarks / Bank Ref"><Input.TextArea rows={2} placeholder="Optional details..." /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save & Print</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupplierPaymentPage;