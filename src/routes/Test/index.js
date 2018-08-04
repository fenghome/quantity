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
          // initialValue:{key:'ccc',label:'aaaaa'},
          rules:[
            // {
            //   required: true,
            //   message: '请选择内容',
            //   trigger: "onSelect"
            // },
            {
              validator:(rule, value, callback)=>{
                console.log('ccc',value);
                if(!value.label.trim()) {
                  return callback('择内容');
                }
                callback();
              }
            }
          ]
        })(
          <Select
          labelInValue={true}
          // onSelect={(value,option) => onSelect(value,option)}
          onSelect={(value)=>onSelect(value)}
          style={{ width: 300 }}
          mode="combobox"
          optionFilterProp="children"
          optionLabelProp="children"
        >
          <Option key="1">aaaaa</Option>
        </Select>
        )
      }

      </FormItem>
    </Form>
  )
}

export default Form.create()(Test);
