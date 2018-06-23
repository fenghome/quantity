import React from 'react';
import Pageheader from '../../components/PageHeader';
import { Form, Card, Input, DatePicker, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Test = ({ form }) => {
  const { getFieldDecorator } = form;
  const FormItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    }
  }
  return (

    <div>
      <Pageheader
        title="基础表单"
        content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
      >
      </Pageheader>
      <Card bordered={false} style={{ margin: 20, background: '#fff' }} >
        <Form hideRequiredMark>
          <FormItem {...FormItemLayout} label="标题">
            {
              getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题'
                  }
                ]
              })(<Input placeholder="给目标起个名字" />)
            }
          </FormItem>
          <FormItem { ...FormItemLayout} label="起止日期">
            {
              getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: '请选择起止日期',
                  },
                ],
              })(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)
            }
          </FormItem>
          <FormItem { ...FormItemLayout} label="目标描述">
            {
              getFieldDecorator('goad', {
                rules: [
                  {
                    required: true,
                    message: '请输入阶段性工作目标',
                  },
                ],
              })(<TextArea rows={4} placeholder="请输入阶段性工作目标" />)
            }
          </FormItem>
          <FormItem { ...FormItemLayout} label="衡量标准">
            {
              getFieldDecorator('biaozhun', {
                rules: [
                  {
                    required: true,
                    message: '请输入衡量标准',
                  },
                ],
              })(<TextArea rows={4} placeholder="请输入衡量标准" />)
            }
          </FormItem>
          <FormItem { ...FormItemLayout} label={
            <span>
              客户
              <span style={{ marginRight:4,color: 'red' }}>(选填)</span>
              <Tooltip title="目标的服务对象">
                <Icon type="info-circle-o"  style={{marginRight:4}} />
              </Tooltip>
            </span>
          }>
            {
              getFieldDecorator('biaozhun')(<Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />)
            }
          </FormItem>
        </Form>
      </Card>

    </div>

  )
}

export default Form.create()(Test);
