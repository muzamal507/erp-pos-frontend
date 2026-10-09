import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';

const FiscalYearsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  const [years, setYears] = useState([
    { key: '1', name: 'Fiscal Year 2025-2026', start: '2025-07-01', end: '2026-06-30', status: 'Closed' },
    { key: '2', name: 'Fiscal Year 2026-2027', start: '2026-07-01', end: '2027-06-30', status: 'Active (Current)' },
  ]);

  const columns = [
    { title: 'Fiscal Year', dataIndex: 'name', key: 'name' },
    { title: 'Start Date', dataIndex: 'start', key: 'start', width: 130 },
    { title: 'End Date', dataIndex: 'end', key: 'end', width: 130 },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 150, render: (s) => <Tag color={s.includes('Active') ? 'green' : 'volcano'}>{s}</Tag> },
    { title: 'Action', key: 'action', render: () => <Button type="link" icon={<CheckCircleOutlined />} style={{ padding: 0 }}>Set Active</Button> },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Fiscal Years Management</span>} headStyle={cardHeadStyle} bordered={false}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>Add Fiscal Year</Button>}
      >
        <Input placeholder="Search year..." prefix={<SearchOutlined />} style={{ width: 300, marginBottom: 16 }} size="large" />
        <Table dataSource={years} columns={columns} pagination={false} scroll={{ x: 600 }} />
      </Card>

      <Modal title="Add New Fiscal Year" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={() => { message.success('Fiscal year added!'); setIsModalVisible(false); }} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Fiscal Year Title" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Fiscal Year 2027-2028" /></Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save Year</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FiscalYearsPage;