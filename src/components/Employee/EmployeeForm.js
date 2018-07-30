import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { connect } from 'dva';
import { IdCodeValid } from '../../utils/utils';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}

const Option = Select.Option;

const EmployeeForm = ({ dispatch, form, employee }) => {

  const { getFieldDecorator, validateFields, resetFields } = form;
  const { formVisible, companys, formModify, currentEmployee } = employee;

  const hideEmployeeForm = () => {
    dispatch({
      type: 'employee/hideEmployeeForm'
    });
    resetFields();
  }

  const employeeFormSubmit = () => {
    validateFields((errors, values) => {
      if (errors) return;
      values.quantityName = values.quantityType.label;
      values.quantityType = values.quantityType.key;
      if (!formModify) {
        dispatch({
          type: 'employee/addEmployee',
          payload: values
        });
      } else {
        values.id = currentEmployee._id;
        dispatch({
          type: 'employee/updateEmployee',
          payload: values
        })
      }
      hideEmployeeForm();
    })
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
            getFieldDecorator('company', {
              initialValue: formModify && currentEmployee.company ? currentEmployee.company._id : "",
              rules: [{
                required: true,
                message: '请选择单位'
              }]
            })(
              <Select
                style={{ width: "100%" }}
                showSearch={true}
                optionFilterProp="children"
                optionLabelProp="children"
              >
                {
                  companys && companys.map(company => (
                    <Option key={company._id}>{company.companyName}</Option>
                  ))
                }

              </Select>
              )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="姓名">
          {
            getFieldDecorator('name', {
              initialValue: formModify ? currentEmployee.name : "",
              rules: [{
                required: true,
                message: '请输入姓名'
              }]
            })(
              <Input />
              )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="身份证号">
          {
            getFieldDecorator('IDCard', {
              initialValue: formModify ? currentEmployee.IDCard : "",
              rules: [{
                validator: (rule, value, callback) => {
                  const validata = IdCodeValid(value);
                  if (!validata.pass) {
                    callback(validata.msg);
                  }
                  callback();
                }
              }]
            })(
              <Input />
              )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="编制类型">
          {
            getFieldDecorator('quantityType', {
              initialValue: {
                key: formModify ? currentEmployee.quantityType : "",
                label: formModify ? currentEmployee.quantityName : "",
              },
              rules: [{
                required: true,
                message: '请选择编制类型'
              }]
            })(
              <Select labelInValue={true} style={{ width: "100%" }}>
                <Option key="quantityXZ">行政</Option>
                <Option key="quantityZF">政法</Option>
                <Option key="quantityGQ">工勤</Option>
                <Option key="quantityQE">全额拨款事业</Option>
                <Option key="quantityCE">差额拨款事业</Option>
                <Option key="quantityZS">自收自支事业</Option>
              </Select>
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
