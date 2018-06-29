import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

const Option = Select.Option;

const EmployeeForm = ({ dispatch, form, employee }) => {

  const { getFieldDecorator } = form;
  const { formVisible } = employee;

  const hideEmployeeForm = () => {
    dispatch({
      type: 'employee/hideEmployeeForm'
    })
  }

  const employeeFormSubmit = () => {

  }

  return (
    <Modal
      title="新增人员"
      visible={formVisible}
      onCancel={hideEmployeeForm}
      onOk={employeeFormSubmit}
    >
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="所在单位">
          {
            getFieldDecorator('companyName')(
              <Select
                mode="combobox"
                style={{ width: "100%" }}
                onChange={()=>console.log('onChange')}
              >
                <Option key="1" value="1111">11111</Option>
                <Option key="2"  value="222">2222</Option>
                <Option key="3"  value="333">3333</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="姓名">
          {
            getFieldDecorator('name')(
              <Input />
            )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="身份证号">
          {
            getFieldDecorator('IDCard')(
              <Input />
            )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="编制类型">
          {
            getFieldDecorator('quantityType')(
              <Input />
            )
          }
        </FormItem>
      </Form>
    </Modal>
  )
}

function mapStateToProps(state) {
  return { employee: state.employee }
}

export default connect(mapStateToProps)(Form.create()(EmployeeForm));
