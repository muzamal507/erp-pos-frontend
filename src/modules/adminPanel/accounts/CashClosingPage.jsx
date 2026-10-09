import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, InputNumber, message } from 'antd';
import { PlusOutlined, SearchOutlined, PrinterOutlined } from '@ant-design/icons';

const CashClosingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [closings, setClosings] = useState([
    { key: '1', date: '2026-10-06 21:00', counter: 'Counter 01', cashier: 'Ali Raza', systemCash: '128,450 PKR', physicalCash: '128,450 PKR', variance: '0 PKR', status: 'Closed' },
  ]);

  const columns = [
    { title: 'Date & Time', dataIndex: 'date', key: 'date', width: 150 },
    { title: 'Counter', dataIndex: 'counter', key: 'counter' },
    { title: 'Cashier', dataIndex: 'cashier', key: 'cashier' },
    { title: 'System Cash', dataIndex: 'systemCash', key: 'systemCash' },
    { title: 'Physical Cash', dataIndex: 'physicalCash', key: 'physicalCash', render: (val) => <b style={{ color: '#3f8600' }}>{val}</b> },
    { title: 'Variance', dataIndex: 'variance', key: 'variance', width: 100, render: (v) => <Tag color="green">{v}</Tag> },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<PrinterOutlined />} style={{ padding: 0 }}>Print Slip</Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    message.success('Cash shift closed successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Cash Closing & Shift Reports</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>New Cash Closing</Button>}
      >
        <Input placeholder="Search closing..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <style>{`.closing-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
        <Table dataSource={closings} columns={columns} pagination={{ pageSize: 5 }} className="closing-table" scroll={{ x: 700 }} />
      </Card>

      <Modal title="Perform Cash Drawer Closing" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose width={600}>
        <Form form={form} layout="vertical" onFinish={handleAdd} style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Form.Item name="notes5000" label="5000 x Notes" style={{ flex: 1 }}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="0" defaultValue={0} />
            </Form.Item>
            <Form.Item name="notes1000" label="1000 x Notes" style={{ flex: 1 }}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="0" defaultValue={0} />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Form.Item name="notes500" label="500 x Notes" style={{ flex: 1 }}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="0" defaultValue={0} />
            </Form.Item>
            <Form.Item name="notes100" label="100 x Notes" style={{ flex: 1 }}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="0" defaultValue={0} />
            </Form.Item>
          </div>
          <Form.Item name="remarks" label="Closing Remarks"><Input.TextArea rows={2} placeholder="Optional note..." /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Finalize Closing</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CashClosingPage;