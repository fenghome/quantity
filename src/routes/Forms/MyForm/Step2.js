import React from 'react';
import { Button, Alert,Divider,Input } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Form } from 'antd';
import styles from './style.less';

const FormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  }
}
const Step2 = ({ dispatch }) => {
  const nextStep = () => {
    dispatch(routerRedux.push('/form/myform/result'));
  }
  return (
    <Form className={styles.formItemStyle}>
      <Form.Item>
        <Alert
          type="info"
          message="确认转账后，资金将直接打入对方账户，无法退回。"
          showIcon
          closable
        />
      </Form.Item>
      <Form.Item {...FormItemLayout} label="付款账户">
        ant-design@alipay.com
      </Form.Item>
      <Form.Item {...FormItemLayout} label="收款账户">
        test@example.com
      </Form.Item>
      <Form.Item {...FormItemLayout} label="收款人姓名">
        Alex
      </Form.Item>
      <Form.Item {...FormItemLayout} label="转账金额">
        <span style={{ fontSize: 24, fontWeight: 300 }}>500</span>（伍佰元整）
      </Form.Item>
      <Divider />
      <Form.Item {...FormItemLayout} label="支付密码">
        <Input type="password" style={{width:"80%"}}/>
      </Form.Item>
      <Form.Item wrapperCol={{span:19,offset:5}}>
        <Button type="primary" style={{marginRight:8}} onClick={nextStep}>提交</Button>
        <Button>上一步</Button>
      </Form.Item>

    </Form>
  )
}
export default connect()(Form.create()(Step2));
