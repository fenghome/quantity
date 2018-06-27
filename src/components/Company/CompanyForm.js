import React from 'react';
import { Modal, Form, Input, Icon,InputNumber  } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;

const CompanyForm = ({ dispatch, company, form }) => {
  const { formVisible } = company;
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
        type:'company/saveCompany',
        payload:data
      });
      dispatch({
        type:'company/hideForm'
      });
      dispatch({
        type:'company/getCompanys'
      })
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
            getFieldDecorator('quantityXZ',{
              rules:[{
                type:'integer',
                message:'输入数字'
              }]
            })(
              <InputNumber style={{width:"100%"}}/>
            )
          }
        </FormItem>
        <FormItem label="政法编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityZF',{
              rules:[{
                type:'integer',
                message:'输入数字'
              }]
            })(
              <InputNumber style={{width:"100%"}}/>
            )
          }
        </FormItem>
        <FormItem label="工勤编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityGQ',{
              rules:[{
                type:'integer',
                message:'输入数字'
              }]
            })(
              <InputNumber style={{width:"100%"}}/>
            )
          }
        </FormItem>
        <FormItem label="全额拨款编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityQE',{
              rules:[{
                type:'integer',
                message:'输入数字'
              }]
            })(
              <InputNumber style={{width:"100%"}}/>
            )
          }
        </FormItem>
        <FormItem label="差额拨款编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityCE',{
              rules:[{
                type:'integer',
                message:'输入数字'
              }]
            })(
              <InputNumber style={{width:"100%"}}/>
            )
          }
        </FormItem>
        <FormItem label="自收自支编制数" {...formItemLayout}>
          {
            getFieldDecorator('quantityZS',{
              rules:[{
                type:'integer',
                message:'输入数字'
              }]
            })(
              <InputNumber style={{width:"100%"}}/>
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
