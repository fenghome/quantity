import React from 'react';
import { Modal, Form, Input, Icon, InputNumber, message } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;

const CompanyForm = ({ dispatch, company, form }) => {
  const { formVisible, formModify, currentCompany } = company;
  const { getFieldDecorator, validateFields, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }

  const hideForm = () => {
    dispatch({
      type: 'company/hideForm'
    });
    resetFields();
  }

  const formSubmit = () => {
    validateFields((errors, values) => {
      if (errors) return;
      let data = formatFormData(values);
      if (!formModify) {
        dispatch({ type: 'company/saveCompany', payload: data });
      } else {
        data._id = currentCompany._id;
        dispatch({ type: 'company/updateCompany', payload: data });
      };
      resetFields();
    })
  }

  const formatFormData = (data) => {
    return {
      companyName: data.companyName,
      quantityXZ: data.quantityXZ || 0,
      quantityZF: data.quantityZF || 0,
      quantityGQ: data.quantityGQ || 0,
      quantityQE: data.quantityQE || 0,
      quantityCE: data.quantityQE || 0,
      quantityZS: data.quantityZS || 0
    }
  }

  return (
    <Modal
      title="新增单位"
      visible={formVisible}
      onCancel={hideForm}
      onOk={formSubmit}
    >
      <Form layout="horizontal">
        <FormItem label="单位名称" {...formItemLayout}>
          {
            getFieldDecorator('companyName', {
              initialValue: currentCompany ? currentCompany.companyName : "",
              rules: [{
                required: true,
                message: '单位名称不能为空'
              }]
            })(<Input />)
          }
        </FormItem>
        <FormItem label="行政编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityXZ', {
              initialValue: currentCompany ? currentCompany.quantityXZ : null,
              rules: [{
                type: 'integer',
                message: '输入数字'
              }]
            })(
              <InputNumber style={{ width: "100%" }} />
              )
          }
        </FormItem>
        <FormItem label="政法编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityZF', {
              initialValue: currentCompany ? currentCompany.quantityZF : null,
              rules: [{
                type: 'integer',
                message: '输入数字'
              }]
            })(
              <InputNumber style={{ width: "100%" }} />
              )
          }
        </FormItem>
        <FormItem label="工勤编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityGQ', {
              initialValue: currentCompany ? currentCompany.quantityGQ : null,
              rules: [{
                type: 'integer',
                message: '输入数字'
              }]
            })(
              <InputNumber style={{ width: "100%" }} />
              )
          }
        </FormItem>
        <FormItem label="全额拨款编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityQE', {
              initialValue: currentCompany ? currentCompany.quantityQE : null,
              rules: [{
                type: 'integer',
                message: '输入数字'
              }]
            })(
              <InputNumber style={{ width: "100%" }} />
              )
          }
        </FormItem>
        <FormItem label="差额拨款编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityCE', {
              initialValue: currentCompany ? currentCompany.quantityCE : null,
              rules: [{
                type: 'integer',
                message: '输入数字'
              }]
            })(
              <InputNumber style={{ width: "100%" }} />
              )
          }
        </FormItem>
        <FormItem label="自收自支编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityZS', {
              initialValue: currentCompany ? currentCompany.quantityZS : null,
              rules: [{
                type: 'integer',
                message: '输入数字'
              }]
            })(
              <InputNumber style={{ width: "100%" }} />
              )
          }
        </FormItem>
      </Form>
    </Modal>

  )
}

function mapStateToProps(state) {
  return { company: state.company }
}

export default connect(mapStateToProps)(Form.create()(CompanyForm));
