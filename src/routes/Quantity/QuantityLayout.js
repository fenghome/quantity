import React from 'react';
import PageHeader from '../../components/PageHeader';

const QuantityLayout = ({children, ...resProps})=>{
  return (
    <div>
      <PageHeader {...resProps}/>
      { children }
    </div>
  )
}

export default QuantityLayout;
