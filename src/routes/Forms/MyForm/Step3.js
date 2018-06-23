import React from 'react';
import { Form } from 'antd';
import Result from '../../../components/Result';
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

const Step3 = () => {
  return (
    <div>
      <Result
        type="success"
        title="操作成功"
        description="预计两小时内到账"
        extra={
          <Form className={styles.formItemStyle}>
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
              <span style={{ fontSize: 24, fontWeight: 300 }}>500</span>元
            </Form.Item>
          </Form>
        }
        actions={<div style={{ background: '#3ba0e9', color: '#fff' }}>操作建议，一般放置按钮组</div>}
      />
    </div>
  )
}

export default Form.create()(Step3);
