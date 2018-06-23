import React from 'react';
import { Form, Select, Button, Input } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
const Option = Select.Option;

const Step1 = ({ dispatch, form }) => {
  const { getFieldDecorator } = form;
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
  const nextStep = () => {
    dispatch(routerRedux.push('/form/myform/confirm'));
  }

  return (
    <Form>
      <FormItem {...FormItemLayout} label="付款账户">
        {
          getFieldDecorator('pay')(
            <Select>
              <Option value="ant">ant-design@126.com</Option>
            </Select>
          )
        }
      </FormItem>
      <FormItem {...FormItemLayout} label="收款账户">
        <Input.Group compact>
          <Select style={{ width: 100 }}>
            <Option value="ant">ant-design@126.com</Option>
          </Select>
          {
            getFieldDecorator('pay')(
              <Input style={{ width: 'calc(100% - 100px)' }} />
            )
          }
        </Input.Group>
      </FormItem>
      <FormItem {...FormItemLayout} label="收款人姓名">
        {
          getFieldDecorator('reciveName')(
            <Input />
          )
        }
      </FormItem>
      <FormItem {...FormItemLayout} label="转账金额">
        {
          getFieldDecorator('reciveName')(
            <Input />
          )
        }
      </FormItem>
      <FormItem wrapperCol={{
        xs:{span:24},
        sm:{span:12,offset:6}
      }}>
        <Button type="primary" onClick={nextStep}>下一步</Button>
      </FormItem>
    </Form>
  )
}

export default connect()(Form.create()(Step1));
