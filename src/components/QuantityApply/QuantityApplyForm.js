import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Select, InputNumber, Input } from 'antd';
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
    validateFields({ force: true }, (err, values) => {
      if (err) return;
      if (formModify) {
        values._id = currentQuantityApply.id;
        dispatch({
          type: 'quantityApply/updateQuantityApply',
          payload: values
        });
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
    const selectCompany = companys.find(company => {
      return company._id == key;
    });
    dispatch({
      type: 'quantityApply/updateCurrQuantityApply',
      payload: { ...currentQuantityApply, selectCompany }
    })
  };

  const onSelectQuantityType = (quantityType) => {
    dispatch({
      type: 'quantityApply/updateCurrQuantityApply',
      payload: { ...currentQuantityApply, selectQuantityType: quantityType }
    });
  }

  const onInputApplyNumber = (event) => {
    const applyNumber = event.target.value;
    dispatch({
      type: 'quantityApply/updateCurrQuantityApply',
      payload: { ...currentQuantityApply, applyNumber }
    });
  }

  const getMayNumber = () => {
    const company = currentQuantityApply.selectCompany;
    const quantityType = currentQuantityApply.selectQuantityType;
    if (company && quantityType) {
      const infactProp = getQuantityInfactProp(quantityType);
      const applyProp = getQuantityApplyProp(quantityType);
      return company[quantityType] - company[infactProp] - company[applyProp];
    }
    return "";
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
              initialValue: formModify ? currentQuantityApply.selectCompany._id : "",
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
              initialValue: formModify ? currentQuantityApply.selectQuantityType : "",
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
              initialValue: formModify ? currentQuantityApply.applyNumber : "",
              rules: [
                {
                  required: true,
                  message: '请输入拟用编制数'
                },
                {
                  pattern: /^\+?[1-9]\d*$/,
                  message: "编制数为大于零的整数"
                },
                {
                  validator: (rule, value, callback) => {
                    if (currentQuantityApply.selectCompany && currentQuantityApply.selectQuantityType) {
                      if (parseInt(value) > getMayNumber()) {
                        callback("不能大于可使用编制数");
                      }
                    }
                    callback();
                  }
                }
              ]
            })(
              <Input style={{ width: 100 }} onBlur={onInputApplyNumber} />
              )
          }
        </FormItem>
        <FormItem label="可用编制数:" {...formItemLayout}>
          <span style={{ fontWeight: 400 }}>
            {currentQuantityApply.selectCompany && currentQuantityApply.selectQuantityType && getMayNumber()}
          </span>
        </FormItem>

      </Form>
    </Modal>
  )
}

function mapStateToProps(state) {
  return { quantityApply: state.quantityApply }
}

export default connect(mapStateToProps)(Form.create()(QuantityApplyForm));
