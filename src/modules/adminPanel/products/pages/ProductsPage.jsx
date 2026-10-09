import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, InputNumber, Select, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Dark header style for the card and table
  const cardHeadStyle = {
    backgroundColor: '#001529',
    color: '#fff',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  };

  // Dummy Product Data (Laravel API GET /api/products se baad mein connect hoga)
  const [products, setProducts] = useState([
    { key: '1', sku: 'ELC-001', name: 'LED Smart TV 43 Inch', category: 'Electronics', cost: 65000, price: 78000, stock: 12 },
    { key: '2', sku: 'ELC-002', name: 'Inverter Split Air Conditioner 1.5 Ton', category: 'Appliances', cost: 110000, price: 135000, stock: 5 },
    { key: '3', sku: 'ELC-003', name: 'Microwave Oven 30L', category: 'Kitchen', cost: 22000, price: 28000, stock: 18 },
    { key: '4', sku: 'ELC-004', name: 'Automatic Washing Machine 12kg', category: 'Appliances', cost: 55000, price: 67000, stock: 3 },
  ]);

  // Table Columns Definition
  const columns = [
    { title: 'SKU', dataIndex: 'sku', key: 'sku', width: 100 },
    { title: 'Product Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category', render: (cat) => <Tag color="blue">{cat}</Tag> },
    { title: 'Cost Price (PKR)', dataIndex: 'cost', key: 'cost' },
    { title: 'Sale Price (PKR)', dataIndex: 'price', key: 'price', render: (val) => <span style={{ fontWeight: 'bold', color: '#3f8600' }}>{val}</span> },
    { title: 'Stock', dataIndex: 'stock', key: 'stock', render: (stock) => (
      <Tag color={stock <= 5 ? 'volcano' : 'green'}>{stock} Units</Tag>
    )},
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} style={{ padding: 0 }}>Edit</Button>
          <Button type="link" danger icon={<DeleteOutlined />} style={{ padding: 0 }}>Delete</Button>
        </Space>
      ),
    },
  ];

  // Form submit handler (Laravel API POST /api/products)
  const handleAddProduct = (values) => {
    console.log('New Product Values:', values);
    message.success('Product successfully added!');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card 
        title={<span style={{ color: '#fff' }}>Products & Inventory Management</span>} 
        headStyle={cardHeadStyle} 
        bordered={false}
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => setIsModalVisible(true)}
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
          >
            Add New Product
          </Button>
        }
      >
        {/* Search Bar & Filters */}
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <Input 
            placeholder="Search by SKU or Product Name..." 
            prefix={<SearchOutlined />} 
            style={{ width: 300 }}
            size="large"
          />
        </div>

        {/* Custom Dark Header Table Styling */}
        <style>
          {`
            .products-table .ant-table-thead > tr > th {
              background-color: #001529 !important;
              color: #fff !important;
              font-weight: bold;
            }
          `}
        </style>

        {/* Products Table */}
        <Table 
          dataSource={products} 
          columns={columns} 
          pagination={{ pageSize: 5 }} 
          className="products-table"
          scroll={{ x: 700 }}
        />
      </Card>

      {/* Add Product Modal Form */}
      <Modal 
        title="Add New Product / Item" 
        open={isModalVisible} 
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleAddProduct} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please enter product name!' }]}>
            <Input size="large" placeholder="e.g. LED TV 32 Inch" />
          </Form.Item>

          <Form.Item name="sku" label="SKU / Barcode" rules={[{ required: true, message: 'Please enter SKU or barcode!' }]}>
            <Input size="large" placeholder="e.g. ELC-005" />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select category!' }]}>
            <Select size="large" placeholder="Select category">
              <Select.Option value="Electronics">Electronics</Select.Option>
              <Select.Option value="Appliances">Appliances</Select.Option>
              <Select.Option value="Kitchen">Kitchen</Select.Option>
            </Select>
          </Form.Item>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Form.Item name="cost" label="Cost Price (PKR)" style={{ flex: 1 }} rules={[{ required: true }]}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="0.00" />
            </Form.Item>
            <Form.Item name="price" label="Sale Price (PKR)" style={{ flex: 1 }} rules={[{ required: true }]}>
              <InputNumber size="large" style={{ width: '100%' }} placeholder="0.00" />
            </Form.Item>
          </div>

          <Form.Item name="stock" label="Opening Stock Quantity" rules={[{ required: true }]}>
            <InputNumber size="large" style={{ width: '100%' }} placeholder="0" />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a' }}>Save Product</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsPage;