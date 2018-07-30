import React from 'react';
import { Form, Input,Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const Test = ({form})=>{
    const { getFieldDecorator } = form;
    const onSelect = ()=>{
      console.log('aaaaa');
    }
    return (
        <Form layout="inline">
            <FormItem label="姓名">
              <Select onSelect={onSelect}>
                <Option value="a">aaaa</Option>
              </Select>
            </FormItem>
        </Form>
    )
}

export default Form.create()(Test);
