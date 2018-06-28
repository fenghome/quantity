import React from 'react';
import { Modal, Form, Input, Icon, InputNumber } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;

const CompanyForm = ({ dispatch, company, form }) => {
  const { formVisible, currentCompany } = company;
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
      const data = {
        companyName: values.companyName,
        quantityXZ: values.quantityXZ || 0,
        quantityZF: values.quantityZF || 0,
        quantityGQ: values.quantityGQ || 0,
        quantityQE: values.quantityQE || 0,
        quantityCE: values.quantityQE || 0,
        quantityZS: values.quantityZS || 0
      }

      dispatch({
        type: 'company/saveCompany',
        payload: data
      });

      dispatch({
        type: 'company/reloadState'
      });

    })
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
            })(
              <Input />
              )
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
