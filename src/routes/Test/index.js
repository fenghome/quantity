import React from 'react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const Test = ({ form }) => {
  const { getFieldDecorator } = form;
  const onSelect = (value) => {
    console.log('aaaaa', value);
  }
  const onChange=(value,option)=>{
    console.log('bbb',value,option)
  }
  return (
    <Form layout="inline">
      <FormItem label="姓名">
      {
        getFieldDecorator('name',{
          initialValue:{key:'ccc',label:'aaaaa'},
          rules:[
            {
              required: true,
              message: '请选择内容',
              trigger: "onBlur"
            }
          ]
        })(
          <Select
          labelInValue={true}
          // onSelect={(value,option) => onSelect(value,option)}
          onBlur={(value)=>onSelect(value)}
          style={{ width: 300 }}
          mode="combobox"
          optionFilterProp="children"
          optionLabelProp="children"
        >
          <Option value="ccc">aaaaa</Option>
        </Select>
        )
      }
       
      </FormItem>
    </Form>
  )
}

export default Form.create()(Test);
