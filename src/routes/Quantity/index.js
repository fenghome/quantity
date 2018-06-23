import React from 'react';
import { Card, Form } from 'antd';
import PageHeader from '../../components/PageHeader';
const FormItem = Form.Item;

const Quantity = ({form})=>{

  const { getFieldDecorator }  = form;

  return (
    <div style={{margin:"-24px -24px 0"}}>
      <PageHeader title="列编管理" />
      <Card style={{margin:"24px 24px 0"}}>

      </Card>

    </div>
  )
}

export default Form.create()(Quantity);
