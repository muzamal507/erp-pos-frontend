import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, InputNumber, Tabs, Checkbox, message, Descriptions, Divider } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, FileTextOutlined, CheckCircleOutlined, DollarOutlined, PrinterOutlined, CalendarOutlined } from '@ant-design/icons';

const PayrollPage = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isEmpModalVisible, setIsEmpModalVisible] = useState(false);
  const [isProcessModalVisible, setIsProcessModalVisible] = useState(false);
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] = useState(false);
  const [isSlipModalVisible, setIsSlipModalVisible] = useState(false);
  
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [empForm] = Form.useForm();
  const [processForm] = Form.useForm();
  const [attendanceForm] = Form.useForm();

  const cardHeadStyle = { backgroundColor: '#001529', color: '#fff', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' };

  // 1. Employees Directory (Supports both Monthly & Daily Wage types)
  const [employees, setEmployees] = useState([
    { key: '1', name: 'Muhammad Ali', designation: 'Cashier', type: 'Monthly', rate: 45000, phone: '0300-1122334', status: 'Active' },
    { key: '2', name: 'Aslam Loader', designation: 'Warehouse Labor', type: 'Daily Wage', rate: 1500, phone: '0311-5566778', status: 'Active' },
  ]);

  // 2. Attendance Records
  const [attendance, setAttendance] = useState([
    { key: '1', emp: 'Muhammad Ali', month: 'October 2026', totalDays: 30, present: 28, absent: 2, leave: 0 },
    { key: '2', emp: 'Aslam Loader', month: 'October 2026', totalDays: 30, present: 22, absent: 8, leave: 0 },
  ]);

  // 3. Monthly Salary Sheets (Calculated based on attendance type)
  const [payrolls, setPayrolls] = useState([
    { key: '1', emp: 'Muhammad Ali', type: 'Monthly', period: 'October 2026', calculation: 'Base: 45,000 - (2 Absent)', net: '42,000 PKR', status: 'Pending' },
    { key: '2', emp: 'Aslam Loader', type: 'Daily Wage', period: 'October 2026', calculation: '22 Days x 1,500 PKR', net: '33,000 PKR', status: 'Paid' },
  ]);

  // Employee Columns
  const empColumns = [
    { title: 'Employee Name', dataIndex: 'name', key: 'name' },
    { title: 'Designation', dataIndex: 'designation', key: 'designation' },
    { title: 'Salary Type', dataIndex: 'type', key: 'type', render: (t) => <Tag color={t === 'Monthly' ? 'blue' : 'purple'}>{t}</Tag> },
    { title: 'Rate (Monthly / Daily)', dataIndex: 'rate', key: 'rate', render: (val, rec) => <b>{val} PKR {rec.type === 'Daily Wage' ? '/ day' : '/ month'}</b> },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 90, render: (s) => <Tag color="green">{s}</Tag> },
    { title: 'Action', key: 'action', render: () => <Button type="link" icon={<EditOutlined />} style={{ padding: 0 }}>Edit</Button> },
  ];

  // Attendance Columns
  const attendanceColumns = [
    { title: 'Employee Name', dataIndex: 'emp', key: 'emp' },
    { title: 'Month', dataIndex: 'month', key: 'month', width: 130 },
    { title: 'Total Days', dataIndex: 'totalDays', key: 'totalDays', width: 100 },
    { title: 'Present', dataIndex: 'present', key: 'present', width: 100, render: (v) => <Tag color="green">{v} Days</Tag> },
    { title: 'Absent', dataIndex: 'absent', key: 'absent', width: 100, render: (v) => <Tag color="red">{v} Days</Tag> },
    { title: 'Leaves', dataIndex: 'leave', key: 'leave', width: 100, render: (v) => <Tag color="gold">{v} Days</Tag> },
  ];

  // Payroll Sheet Columns
  const payrollColumns = [
    { title: 'Employee', dataIndex: 'emp', key: 'emp' },
    { title: 'Type', dataIndex: 'type', key: 'type', width: 110, render: (t) => <Tag color={t === 'Monthly' ? 'blue' : 'purple'}>{t}</Tag> },
    { title: 'Period', dataIndex: 'period', key: 'period', width: 130 },
    { title: 'Calculation Summary', dataIndex: 'calculation', key: 'calculation' },
    { title: 'Net Payable', dataIndex: 'net', key: 'net', render: (val) => <b style={{ color: '#3f8600' }}>{val}</b> },
    { title: 'Status', dataIndex: 'status', key: 'status', width: 100, render: (s) => <Tag color={s === 'Paid' ? 'green' : 'gold'}>{s}</Tag> },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<FileTextOutlined />} onClick={() => { setSelectedSlip(record); setIsSlipModalVisible(true); }} style={{ padding: 0 }}>Payslip</Button>
          {record.status === 'Pending' && (
            <Button type="link" icon={<CheckCircleOutlined />} onClick={() => message.success(`Salary marked as Paid!`)} style={{ padding: 0, color: '#52c41a' }}>Mark Paid</Button>
          )}
        </Space>
      ),
    },
  ];

  const handleAddEmployee = () => {
    message.success('Employee profile created successfully!');
    setIsEmpModalVisible(false);
    empForm.resetFields();
  };

  const handleSaveAttendance = () => {
    message.success('Attendance summary recorded successfully!');
    setIsAttendanceModalVisible(false);
    attendanceForm.resetFields();
  };

  const handleProcessSalary = () => {
    message.success('Salary generated based on attendance records!');
    setIsProcessModalVisible(false);
    processForm.resetFields();
  };

  const tabItems = [
    {
      key: '1',
      label: 'Salary Sheets & Processing',
      children: (
        <div>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <Input placeholder="Search salary sheet..." prefix={<SearchOutlined />} style={{ width: 300 }} size="large" />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsProcessModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>
              Generate Salary from Attendance
            </Button>
          </div>
          <style>{`.pay-table .ant-table-thead > tr > th { background-color: #001529 !important; color: #fff !important; font-weight: bold; }`}</style>
          <Table dataSource={payrolls} columns={payrollColumns} pagination={{ pageSize: 5 }} className="pay-table" scroll={{ x: 700 }} />
        </div>
      ),
    },
    {
      key: '2',
      label: 'Attendance & Logs',
      children: (
        <div>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <Input placeholder="Search attendance..." prefix={<SearchOutlined />} style={{ width: 300 }} size="large" />
            <Button type="primary" icon={<CalendarOutlined />} onClick={() => setIsAttendanceModalVisible(true)} style={{ backgroundColor: '#1890ff' }}>
              Log Monthly Attendance
            </Button>
          </div>
          <Table dataSource={attendance} columns={attendanceColumns} pagination={{ pageSize: 5 }} scroll={{ x: 600 }} />
        </div>
      ),
    },
    {
      key: '3',
      label: 'Employees Directory',
      children: (
        <div>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <Input placeholder="Search employee..." prefix={<SearchOutlined />} style={{ width: 300 }} size="large" />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsEmpModalVisible(true)} style={{ backgroundColor: '#52c41a' }}>
              Add New Employee
            </Button>
          </div>
          <Table dataSource={employees} columns={empColumns} pagination={{ pageSize: 5 }} scroll={{ x: 600 }} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card title={<span style={{ color: '#fff' }}>Payroll, Attendance & Wage Management System</span>} headStyle={cardHeadStyle} bordered={false}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>

      {/* Modal 1: Add Employee with Salary Type Selection */}
      <Modal title="Add New Employee" open={isEmpModalVisible} onCancel={() => setIsEmpModalVisible(false)} footer={null} destroyOnClose>
        <Form form={empForm} layout="vertical" onFinish={handleAddEmployee} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Employee Full Name" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Aslam Khan" /></Form.Item>
          <Form.Item name="designation" label="Designation" rules={[{ required: true }]}><Input size="large" placeholder="e.g. Helper / Cashier" /></Form.Item>
          <Form.Item name="type" label="Salary Structure Type" rules={[{ required: true }]}>
            <Select size="large" placeholder="Select type">
              <Select.Option value="Monthly">Monthly Salary Base</Select.Option>
              <Select.Option value="Daily Wage">Daily Wage Base</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="rate" label="Salary Rate (PKR)" rules={[{ required: true }]}>
            <InputNumber size="large" style={{ width: '100%' }} placeholder="Enter monthly salary or per-day wage" />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsEmpModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save Employee</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal 2: Log Attendance */}
      <Modal title="Log Monthly Attendance Summary" open={isAttendanceModalVisible} onCancel={() => setIsAttendanceModalVisible(false)} footer={null} destroyOnClose>
        <Form form={attendanceForm} layout="vertical" onFinish={handleSaveAttendance} style={{ marginTop: '16px' }}>
          <Form.Item name="emp" label="Select Employee" rules={[{ required: true }]}>
            <Select size="large" placeholder="Choose employee">
              <Select.Option value="Muhammad Ali">Muhammad Ali (Monthly)</Select.Option>
              <Select.Option value="Aslam Loader">Aslam Loader (Daily Wage)</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="month" label="Month & Year" rules={[{ required: true }]}><Input size="large" placeholder="October 2026" /></Form.Item>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Form.Item name="present" label="Present Days" style={{ flex: 1 }}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="26" />
            </Form.Item>
            <Form.Item name="absent" label="Absent Days" style={{ flex: 1 }}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="2" />
            </Form.Item>
          </div>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsAttendanceModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save Attendance</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal 3: Generate Salary from Attendance */}
      <Modal title="Generate Salary based on Attendance" open={isProcessModalVisible} onCancel={() => setIsProcessModalVisible(false)} footer={null} destroyOnClose>
        <Form form={processForm} layout="vertical" onFinish={handleProcessSalary} style={{ marginTop: '16px' }}>
          <Form.Item name="month" label="Select Period / Month" rules={[{ required: true }]}><Input size="large" placeholder="October 2026" /></Form.Item>
          <p style={{ color: '#8c8c8c', fontSize: '13px' }}>* System will automatically calculate monthly salary after absent deductions and multiply daily wages with present days.</p>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setIsProcessModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Calculate & Generate All</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal 4: Payslip Preview */}
      <Modal title="Official Salary Slip" open={isSlipModalVisible} onCancel={() => setIsSlipModalVisible(false)} footer={[
        <Button key="print" type="primary" icon={<PrinterOutlined />} onClick={() => window.print()} style={{ backgroundColor: '#52c41a' }}>Print Slip</Button>,
        <Button key="close" onClick={() => setIsSlipModalVisible(false)}>Close</Button>
      ]} destroyOnClose width={600}>
        {selectedSlip && (
          <div style={{ padding: '20px', background: '#fff' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#001529' }}>Tahir Electronics & ERP</h2>
              <p style={{ margin: 0, color: '#8c8c8c' }}>Attendance Based Salary Statement</p>
            </div>
            <Descriptions bordered size="small" column={2}>
              <Descriptions.Item label="Employee Name">{selectedSlip.emp}</Descriptions.Item>
              <Descriptions.Item label="Salary Type">{selectedSlip.type}</Descriptions.Item>
              <Descriptions.Item label="Pay Period">{selectedSlip.period}</Descriptions.Item>
              <Descriptions.Item label="Calculation">{selectedSlip.calculation}</Descriptions.Item>
              <Descriptions.Item label="Net Payable Amount" span={2}><b style={{ fontSize: '16px', color: '#3f8600' }}>{selectedSlip.net}</b></Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PayrollPage;