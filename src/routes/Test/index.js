import React from 'react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const Test = ({ form }) => {
  const { getFieldDecorator } = form;
  const onSelect = (value,option) => {
    console.log('aaaaa', value,option);
  }
  const onChange=(value,option)=>{
    console.log('bbb',value,option)
  }
  return (
    <Form layout="inline">
      <FormItem label="姓名">
        <Select
          // labelInValue={true}
          // onSelect={(value,option) => onSelect(value,option)}
          onChange={(value,option)=>onChange(value,option)}
          style={{ width: 300 }}
          mode="combobox"
          optionFilterProp="children"
          optionLabelProp="children"
        >
          <Option value="a">aaaa</Option>
        </Select>
      </FormItem>
    </Form>
  )
}

export default Form.create()(Test);
