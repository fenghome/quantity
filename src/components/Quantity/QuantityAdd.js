import React from 'react';
import { Form, Card, Table, Button, Divider, Select, Input } from 'antd';
import { connect } from 'dva';
import { IdCodeValid } from '../../utils/utils';
import styles from './QuantityAdd.less';

const Option = Select.Option;
const FormItem = Form.Item;

const QuantityAdd = ({ quantity, form, dispatch }) => {
  const { companys = [], currQuantity = [{ key: 0 }], currQuantityId } = quantity;
  const { getFieldDecorator, validateFields } = form;

  const columns = [
    {
      key: 'outCompany',
      title: <div style={{ textAlign: "center" }}>调出单位</div>,
      dataIndex: 'outCompany',
      width: 260,
      render: (text, record, index) => (
        <FormItem>
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
      key: 'inCompany',
      title: <div style={{ textAlign: "center" }}>调入单位</div>,
      dataIndex: 'inCompany',
      width: 260,
      render: (text, record, index) => (
        <FormItem>
          {
            getFieldDecorator(`inCompany${index}`, {
              // initialValue: {key:record.inCompanyId,label:record.inCompanyName},
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
                labelInValue={true}
                optionFilterProp="children"
                optionLabelProp="children"
                onBlur={(value) => {
                  // updateCurrQuantity({ 
                  //   inCompanyId: value.key,
                  //   inCompanyName:value.label }, 
                  // index)
                  console.log(value);
                }}
              >
                {
                  companys.map(item => (
                    <Option key={item.companyId} value="dddd">{item.companyName}</Option>
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
      width: 160,
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
                  updateCurrQuantity({ employeeId: value }, index)
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
      width: 200,
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
      dataIndex: 'quantityName',
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
        const { employees,...resObj  } = item;
        return resObj;
      });
      dispatch({
        type: 'quantity/addQuantity',
        payload: { quantityId:currQuantityId, quantityBody:currObj }
      })
    })
  }

  const updateCurrQuantity = (obj, index) => {
    let currObj = [...currQuantity];
    currObj[index] = { ...currQuantity[index], ...obj };
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

  return (
    <Card style={{ margin: "24px 24px 0" }}>
      <Form className={styles.addForm}>
        <Table rowKey="key" columns={columns} dataSource={currQuantity} style={{ marginTop: 24 }} bordered />
      </Form>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Button type="primary" style={{ marginRight: 40 }} onClick={addQuantity}>确定</Button>
        <Button>取消</Button>
      </div>
    </Card>
  )
}

function mapStateToProps(state) {
  return { quantity: state.quantity }
}

export default connect(mapStateToProps)(Form.create()(QuantityAdd));
