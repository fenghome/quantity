import React from 'react';
import { Link } from 'dva/router';
import PageHeader from '../../components/PageHeader';


const QuantityLayout = ({ comp, ...props }) => {
  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader title="列编管理" />
      {comp}
    </div>
  )
}

export default QuantityLayout;
