import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { connect } from 'dva';

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

  const IdCodeValid = (code) => {
    //身份证号合法性验证
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var row = {
      'pass': true,
      'msg': '验证成功'
    };
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
      row = {
        'pass': false,
        'msg': '身份证号格式错误'
      };
    } else if (!city[code.substr(0, 2)]) {
      row = {
        'pass': false,
        'msg': '身份证号地址编码错误'
      };
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        if (parity[sum % 11] != code[17].toUpperCase()) {
          row = {
            'pass': false,
            'msg': '身份证号校验位错误'
          };
        }
      }
    }
    return row;
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
