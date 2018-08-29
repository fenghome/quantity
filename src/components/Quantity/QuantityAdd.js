import React from 'react';
import { Form, Card, Table, Button, Divider, Select, Input, message, Alert } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { IdCodeValid, getQuantityApplyProp, getQuantityName, getQuantityNameForApply, getQuantityInfactProp } from '../../utils/utils';
import styles from './QuantityAdd.less';

const Option = Select.Option;
const FormItem = Form.Item;

const QuantityAdd = ({ quantity, form, dispatch }) => {
  const {
    companys = [],
    currQuantity = [{ key: 0 }],
    currQuantityId,
    currInCompanyName,
    currInCompanyId,
    currInCompanyApplys,
    currInCompanyUses,
    quantityInfo,

  } = quantity;
  const { getFieldDecorator, validateFields, resetFields, setFields } = form;

  const columns = [
    {
      key: 'outCompany',
      title: <div style={{ textAlign: "center" }}>调出单位</div>,
      dataIndex: 'outCompany',
      width: 360,
      render: (text, record, index) => (
        <FormItem style={{ width: "100%" }}>
          {
            getFieldDecorator(`outCompany${index}`, {
              initialValue: text,
              rules: [
                {
                  required: true,
                  message: '请选择内容',
                  trigger: "onBlur"
                }
              ]
            })(
              <Select
                style={{ width: "100%" }}
                mode="combobox"
                optionFilterProp="children"
                optionLabelProp="children"
                onBlur={(value) => {
                  updateCurrEQ(value, index)
                }}
              >
                {
                  companys.map(item => (
                    <Option key={item.companyName}>{item.companyName}</Option>
                  ))
                }
              </Select>
              )
          }
        </FormItem>
      )
    },
    {
      key: 'employeeId',
      title: <div style={{ textAlign: "center" }}>姓名</div>,
      dataIndex: 'employeeId',
      width: 220,
      render: (text, record, index) => (
        <FormItem>
          {
            getFieldDecorator(`employeeId${index}`, {
              initialValue: text,
              rules: [
                {
                  required: true,
                  message: '姓名不能为空'
                }
              ]
            })(
              <Select
                mode="combobox"
                optionFilterProp="children"
                optionLabelProp="children"
                onBlur={value => {
                  let obj = {
                    employeeId: value,
                    isNewEmployee: true,
                    IDCard: '',
                    quantityType: ''
                  };
                  // console.log('record',record);
                  if (record.employees && record.employees.length > 0) {
                    const employee = record.employees.find(item => (
                      item._id == value
                    ));
                    console.log('employee',employee);
                    if (employee) {
                      obj = {
                        employeeId: value,
                        isNewEmployee: false,
                        IDCard: employee.IDCard,
                        quantityType: employee.quantityType
                      }
                    }
                  }
                  console.log('obj',obj);
                  updateCurrQuantity(obj, index)
                }}
              >
                {
                  currQuantity[index].employees && currQuantity[index].employees.map(item => (
                    <Option key={item._id}>{item.name}</Option>
                  ))
                }
              </Select>
              )
          }
        </FormItem>
      )
    },
    {
      key: 'IDCard',
      title: <div style={{ textAlign: "center" }}>身份证号</div>,
      dataIndex: 'IDCard',
      width: 240,
      render: (text, record, index) => (
        <FormItem>
          {
            getFieldDecorator(`IDCard${index}`, {
              initialValue: text,
              rules: [
                {
                  required: true,
                  message: '身份证号不能为空'
                }, {
                  validator: (rule, value, callback) => {
                    if (value) {
                      const validate = IdCodeValid(value);
                      if (!validate.pass) {
                        return callback(validate.msg);
                      }
                    }
                    callback();
                  }
                }
              ]
            })(
              <Input onBlur={(e) => { updateCurrQuantity({ IDCard: e.target.value }, index) }} />
              )
          }
        </FormItem>
      )
    },
    {
      key: 'quantityType',
      title: <div style={{ textAlign: "center" }}>编制性质</div>,
      dataIndex: 'quantityType',
      width: 170,
      render: (text, record, index) => (
        <FormItem>
          {

            getFieldDecorator(`quantityType${index}`, {
              initialValue: text,
              rules: [
                {
                  required: true,
                  message: '请选择编制性质'
                }
              ]
            })(
              <Select
                style={{ width: "100%" }}
                allowClear={true}
                onSelect={
                  (value) => updateCurrQuantity({ quantityType: value }, index)
                }
              >
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
      )
    },
    {
      key: 'option',
      title: <div style={{ textAlign: "center" }}>操作</div>,
      render: (text, record, index) => (
        <div style={{ textAlign: "center" }}>
          <a onClick={() => addCurrQuantity(index)}>新增</a>
          <Divider type="vertical" />
          <a onClick={() => dellCurrQuantity(index)}>删除</a>
        </div>
      )
    }
  ];

  const addCurrQuantity = (index) => {
    let currObj = [...currQuantity];
    currObj.splice(index + 1, 0, {});
    currObj = currObj.map((item, i) => {
      item.key = i;
      return item;
    })
    dispatch({
      type: 'quantity/updateCurrQuantity',
      payload: currObj
    });
    updateCurrInCompanyUses(currObj);
  }

  const dellCurrQuantity = (index) => {
    let currObj = [...currQuantity];
    currObj.splice(index, 1);
    currObj = currObj.map((item, i) => {
      item.key = i;
      return item;
    })
    dispatch({
      type: 'quantity/updateCurrQuantity',
      payload: currObj
    });
    updateCurrInCompanyUses(currObj);
  }

  const addQuantity = () => {
    validateFields((err, values) => {
      if (err) return;
      //验证是否超出可用编制数
      if (quantityInfo && !quantityInfo.success) {
        message.info('超出可用编制数');
        return;
      }
      //验证调出调入是否为同一单位
      for (let i = 0; i < currQuantity.length; i++) {
        if (currQuantity[i].outCompany == currInCompanyName) {
          dispatch({
            type: 'quantity/updateQuantityInfo',
            payload: {
              success: false,
              message: '调出单位与调入单位为同一单位'
            }
          })
          return;
        }
      }

      let currObj = currQuantity.map(item => {
        const { employees, ...resObj } = item;
        return resObj;
      });

      dispatch({
        type: 'quantity/addQuantity',
        payload: {
          quantityId: currQuantityId,
          inCompanyId: currInCompanyId,
          inCompanyName: currInCompanyName,
          currInCompanyUses:currInCompanyUses,
          quantityBody: currObj
        }
      })
    })
  }

  const updateCurrInCompany = (value, option) => {
    let selectCompany = companys.find(item => {
      return item._id == value
    });
    let currInCompanyApplys = {
      applyXZ: selectCompany.applyXZ,
      applyZF: selectCompany.applyZF,
      applyGQ: selectCompany.applyGQ,
      applyQE: selectCompany.applyQE,
      applyCE: selectCompany.applyCE,
      applyZS: selectCompany.applyZS,
    }
    dispatch({
      type: 'quantity/setCurrInCompany',
      payload: {
        currInCompanyId: value,
        currInCompanyName: option.props.children,
        currInCompanyApplys
      },
    });
    updateQuantityInfo(currInCompanyApplys);
  }


  const updateQuantityInfo = (currApplys, currUses) => {
    let inCompanyApplys = currApplys || currInCompanyApplys;
    let okMessage = '可用编制数：';
    for (let key in inCompanyApplys) {
      let quantityName = getQuantityNameForApply(key);
      let applyNumber = inCompanyApplys[key];
      if (parseInt(applyNumber) > 0) {
        okMessage = okMessage + `${quantityName}编制${applyNumber}名；`
      }
    }
    if (okMessage.slice(-1) == '；') {
      okMessage = okMessage.slice(0, okMessage.length - 1) + '。';
    }

    let errMessage = '';
    let inCompanyUses = currUses || currInCompanyUses;
    for (let key in inCompanyUses) {
      let useNumber = inCompanyUses[key];
      let applyNumber = inCompanyApplys[key] || 0;
      let quantityName = getQuantityNameForApply(key);
      if (useNumber > applyNumber) {
        errMessage = errMessage + `${quantityName}编制超出可用数量；`
      }
    }
    if (errMessage.slice(-1) == '；') {
      errMessage = errMessage.slice(0, errMessage.length - 1) + '。';
    }

    if (errMessage) {
      dispatch({
        type: 'quantity/updateQuantityInfo',
        payload: {
          success: false,
          message: errMessage
        }
      })
    } else {
      dispatch({
        type: 'quantity/updateQuantityInfo',
        payload: {
          success: true,
          message: okMessage
        }
      })
    }
  }

  const updateCurrInCompanyUses = (currQuantity) => {
    let useObj = {};
    currQuantity.forEach(item => {
      if (item.quantityType) {
        let applyProp = getQuantityApplyProp(item.quantityType);
        useObj[applyProp] = useObj[applyProp] || 0;
        useObj[applyProp] += 1;
      }
    });
    dispatch({
      type: 'quantity/updateCurrInCompanyUses',
      payload: useObj
    });
    updateQuantityInfo(null, useObj);
  }

  const updateCurrQuantity = (obj, index) => {
    let currObj = [...currQuantity];
    currObj[index] = { ...currQuantity[index], ...obj };
    //如果是更改编制情况执行下面的操作
    updateCurrInCompanyUses(currObj);
    dispatch({
      type: 'quantity/updateCurrQuantity',
      payload: currObj
    });
    resetFields(`IDCard${index}`,`quantityType${index}`);
  }

  const updateCurrEQ = (companyName, index) => {
    updateQuantityInfo();
    dispatch({
      type: 'quantity/updateCurrEQ',
      payload: { companyName, index }
    })
  }

  const cancelQuantity = () => {
    dispatch({
      type: 'quantity/reloadState'
    });
    dispatch(routerRedux.push('/quantity/list'));
  }

  return (
    <Card style={{ margin: "24px 24px 0" }}>
      <Form className={styles.addForm} >
        <div className={styles.quantityTitle}>
          <div className={styles.quantitySN}>列编卡号:<span>{currQuantityId}</span></div>
          {
            quantityInfo && quantityInfo.message &&
            <Alert
              type={quantityInfo.success ? "info" : "error"}
              style={{ width: 500 }}
              message={
                quantityInfo.message
              } />
          }
          <FormItem>
            <div className={styles.inCompanyStyle}>
              <span style={{ marginRight: 8 }}>调入单位:</span>
              {
                getFieldDecorator('inCompanyId', {
                  initialValue: currInCompanyId,
                  rules: [
                    {
                      required: true,
                      message: '请选择内容',
                    }
                  ]
                })(
                  <Select
                    style={{ width: 240 }}
                    showSearch={true}
                    optionFilterProp="children"
                    optionLabelProp="children"
                    onSelect={(value, option) => {
                      updateCurrInCompany(value, option)
                    }}
                  >
                    {
                      companys.map(item => (
                        <Option key={item._id} >{item.companyName}</Option>
                      ))
                    }
                  </Select>
                  )}
            </div>
          </FormItem>
        </div>
        <Table rowKey="key" columns={columns} dataSource={currQuantity} bordered />
      </Form>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Button type="primary" style={{ marginRight: 40 }} onClick={addQuantity}>确定</Button>
        <Button onClick={cancelQuantity}>取消</Button>
      </div>
    </Card>
  )
}

function mapStateToProps(state) {
  return { quantity: state.quantity }
}

export default connect(mapStateToProps)(Form.create()(QuantityAdd));
