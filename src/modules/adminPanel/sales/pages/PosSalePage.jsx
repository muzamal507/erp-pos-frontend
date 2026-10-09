import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Input, Card, Button, Table } from 'antd';
import { SearchOutlined, BarcodeOutlined } from '@ant-design/icons';

const PosSalePage = () => {
  const cartColumns = [
    { title: '#', dataIndex: 'key', key: 'key', width: 50 },
    { title: 'Product', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Qty', dataIndex: 'qty', key: 'qty', width: 70 },
    { title: 'Subtotal', dataIndex: 'subtotal', key: 'subtotal' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('hold') === '1') {
      setHoldModalOpen(true);                 // <-- apni hold modal wali state ka naam likhein
      setSearchParams({}, { replace: true }); // param saaf, taake dobara click par phir khule
    }
  }, [searchParams, setSearchParams]);

  return (
    <div>
      <h2 style={{ marginBottom: '16px' }}>Point of Sale (POS) Terminal</h2>
      
      <Row gutter={[16, 16]}>
        {/* Left Side: Product Selection & Barcode (Mobile par full width, Desktop par 14 columns) */}
        <Col xs={24} lg={14}>
          <Card title="Product Selection" bordered={false} bodyStyle={{ padding: '12px' }}>
            <Input 
              size="large" 
              placeholder="Scan Barcode Here..." 
              prefix={<BarcodeOutlined />} 
              style={{ marginBottom: '12px' }}
            />
            <Input 
              size="large" 
              placeholder="Search Product Name..." 
              prefix={<SearchOutlined />} 
            />
            <div style={{ 
              marginTop: '16px', 
              minHeight: '250px', 
              border: '1px dashed #d9d9d9', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#888',
              textAlign: 'center',
              padding: '20px'
            }}>
              Product Grid / Categories View (Responsive)
            </div>
          </Card>
        </Col>

        {/* Right Side: Cart & Billing Summary (Mobile par niche show hoga) */}
        <Col xs={24} lg={10}>
          <Card title="Current Sale Invoice" bordered={false} bodyStyle={{ padding: '12px' }}>
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <Table 
                dataSource={[]} 
                columns={cartColumns} 
                pagination={false} 
                locale={{ emptyText: 'No items in cart' }}
                size="small"
                scroll={{ x: 300 }}
              />
            </div>
            
            <div style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '6px' }}>
              <h4 style={{ margin: 0 }}>Net Total: 0.00 PKR</h4>
            </div>
            
            <Button type="primary" size="large" block style={{ marginTop: '12px', backgroundColor: '#52c41a', height: '45px', fontWeight: 'bold' }}>
              Complete Sale (Cash - F1)
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PosSalePage;