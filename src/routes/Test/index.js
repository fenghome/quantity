import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const Test = ({form})=>{
    const { getFieldDecorator } = form;
    return (
        <Form layout="inline">
            <FormItem label="姓名">
                {
                    getFieldDecorator('name',{
                        rules:[{
                            validator:(rule, value, callback)=>{
                                if(value=="aaa"){
                                    callback("错误")
                                }
                                callback();
                            }
                        }]
                    })(
                        <Input />
                    )
                }
            </FormItem>
        </Form>
    )
}

export default Form.create()(Test);