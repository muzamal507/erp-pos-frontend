import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center', color: '#888', fontSize: '12px' }}>
      Tahir's Tech Solutions ERP & POS © 2026
    </AntFooter>
  );
};

export default Footer;