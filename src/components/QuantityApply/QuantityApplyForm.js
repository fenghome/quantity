import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Select, InputNumber } from 'antd';
import { getQuantityApplyProp, getQuantityInfactProp } from '../../utils/utils';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};
const Option = Select.Option;

const QuantityApplyForm = ({ dispatch, quantityApply, form }) => {
  const { formVisible, formModify, companys, currentQuantityApply } = quantityApply;
  const { getFieldDecorator, validateFields, resetFields } = form;

  const formSubmit = () => {
    validateFields((err, values) => {
      if (err) return;
      if (formModify) {
        dispatch({
          type: 'quantityApply/updateQuantityApply',
          payload: values
        })
      } else {
        dispatch({
          type: 'quantityApply/addQuantityApply',
          payload: values
        });
      }
      resetFields();
    })
  }

  const hideForm = () => {
    dispatch({
      type: 'quantityApply/hideForm'
    });
    resetFields();
  }

  const onSelectCompany = (key) => {
    let currObj = { ...currentQuantityApply } || {};
    const company = companys.find(company => {
      return company._id == key;
    });
    if (currObj.quantityType) {
      const quantityType = currObj.quantityType;
      const infactProp = getQuantityInfactProp(quantityType);
      const applyProp = getQuantityApplyProp(quantityType);
      const mayNumber = company[quantityType] - company[infactProp] - company[applyProp];
      currObj = { ...currObj, company, mayNumber };
    } else {
      currObj = { ...currObj, company };
    }
    dispatch({
      type: 'quantityApply/updateCurrQuantityApply',
      payload: currObj
    })
  };

  const onSelectQuantityType = (quantityType) => {
    let currObj = { ...currentQuantityApply } || {};
    currObj.quantityType = quantityType;
    if (currObj.company) {
      const infactProp = getQuantityInfactProp(quantityType);
      const applyProp = getQuantityApplyProp(quantityType);
      const mayNumber = currObj.company[quantityType] - currObj.company[infactProp] - currObj.company[applyProp];
      currObj.mayNumber = mayNumber;
    }
    dispatch({
      type: 'quantityApply/updateCurrQuantityApply',
      payload: currObj
    });
  }

  const aaaaaa = (rule, value, callback)=>{
    console.log('value',value);
    if(value>3){
      callback("不能大于3");
    }
    callback();
  }

  return (
    <Modal
      title="新增编制申请"
      visible={formVisible}
      onOk={formSubmit}
      onCancel={hideForm}
    >
      <Form>
        <FormItem {...formItemLayout} label="单位名称">
          {
            getFieldDecorator('company', {
              initialValue: formModify ? currentQuantityApply.company._id : "",
              rules: [{
                required: true,
                message: "请选择单位"
              }]
            })(
              <Select showSearch optionFilterProp="children" onSelect={key => onSelectCompany(key)}>
                {
                  companys.map(company => (
                    <Option key={company._id}>{company.companyName}</Option>
                  ))
                }
              </Select>
              )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="编制类型">
          {
            getFieldDecorator('quantityType', {
              initialValue: formModify ? currentQuantityApply.quantityType : "",
              rules: [{
                required: true,
                message: '请选择编制类型'
              }]
            })(
              <Select onSelect={key => onSelectQuantityType(key)}>
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
        <FormItem {...formItemLayout} label="拟用编制数">
          {
            getFieldDecorator('applyNumber', {
              initialValue: currentQuantityApply ? currentQuantityApply.applyNumber : "",
              rules: [
                {
                  required: true,
                  message: '请输入拟用编制数'
                },
                {
                  pattern: new RegExp(currentQuantityApply && currentQuantityApply.mayNumber && currentQuantityApply.mayNumber + "^\+?[1-9]\d*$"),
                  message: "编制数为大于零的整数"
                },
              ]
            })(
              <div>
                <InputNumber />
                <span style={{ marginLeft: 24 }}>
                  可用编制数:
                  <span style={{ marginLeft: 8, fontWeight: 400 }}>
                    {currentQuantityApply && currentQuantityApply.mayNumber}
                  </span>
                </span>
              </div>
              )
          }
        </FormItem>
      </Form>
    </Modal>
  )
}

function mapStateToProps(state) {
  return { quantityApply: state.quantityApply }
}

export default connect(mapStateToProps)(Form.create()(QuantityApplyForm));
