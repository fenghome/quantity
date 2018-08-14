import React from 'react';
import { Form, Card, Table, Button, Divider, Select, Input, message, Alert } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { IdCodeValid, getQuantityApplyProp,getQuantityName } from '../../utils/utils';
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
                    if (employee) {
                      obj = {
                        employeeId: value,
                        isNewEmployee: false,
                        IDCard: employee.IDCard,
                        quantityType: employee.quantityType
                      }
                    }
                  }
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
    })
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
    })
  }

  const addQuantity = () => {
    validateFields((err, values) => {
      if (err) return;
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
    updateQuantityInfo();
  }

 
  const updateQuantityInfo = ()=>{
    
    if(!currInCompanyApplys) return;

    let message = '可用编制数：';
    for(key in currInCompanyApplys){
      let quantityName = getQuantityName(key);
      let applyNumber = currInCompanyApplys[key];
      if(parseInt(applyNumber)>0){
        message = message + `${quantityName}编制${applyNumber}名；`
      }
    }
    if(message.slice(-1)=='；'){
      message = message.slice(0,message.length-1) + '。';
    }

    let errMessage = '';
    for(key in currInCompanyUses){
      let useNumber = currInCompanyUses[key];
      let applyNumber = currInCompanyApplys[key] || 0;
      let quantityName = getQuantityName(key);
      if( userNumber > applyNumber ){
        errMessage = errMessage + `${quantityName}编制超出可用数量；`
      }
    }
    if(errMessage.slice(-1)=='；'){
      errMessage = errMessage.slice(0,errMessage.length-1) + '。';
    }

    if(errMessage){
      dispatch({
        type:'quantity/updateQuantityInfo',
        payload:{
          success:false,
          message:errMessage
        }
      })
    }else{
      dispatch({
        type:'quantity/updateQuantityInfo',
        payload:{
          success:true,
          message:message
        }
      })
    }
  }
  

  const updateCurrQuantity = (obj, index) => {
    let currObj = [...currQuantity];
    currObj[index] = { ...currQuantity[index], ...obj };
    //如果是更改编制情况执行下面的操作
    if (obj.quantityType) {
      //获得当前编制类型的使用数量
      let useNumber = 0;
      currObj.forEach(item => {
        if (item.quantityType == obj.quantityType) {
          useNumber++;
        }
      });
      let useObj = { ...currInCompanyUses};
      useObj[getQuantityApplyProp(obj.quantityType)] = userNumber;
      dispatch({
        type:'quantity/upadteCurrInCompanyUses',
        payload:useObj
      });
      updateQuantityInfo();
    }

    dispatch({
      type: 'quantity/updateCurrQuantity',
      payload: currObj
    });
  }

  const updateCurrEQ = (companyName, index) => {
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
            currInCompanyApplys &&
            <Alert
            type="info"
            style={{width:500}}
            message={

              }/>
            }
          <FormItem>
            <div className={styles.inCompanyStyle}>
              <span style={{ marginRight: 8 }}>调入单位:</span>
              {
                getFieldDecorator('inCompanyId', {
                  // initialValue: '',
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
