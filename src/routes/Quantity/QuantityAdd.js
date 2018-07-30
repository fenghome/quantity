import React from 'react';
import { Form, Card, Table, Button, Divider, Select, Input } from 'antd';
import { connect } from 'dva';

const Option = Select.Option;
const FormItem = Form.Item;

const QuantityAdd = ({ quantity, form }) => {
  const { companys = [] } = quantity;
  const { getFieldDecorator } = form;
  const dataSource = [
    {
      key:'001',
      quantityId: '001',
      name: '张三',
      IDCard: '13010519790402112',
      quantityType: '行政',
      inCompany: '机构编制委员会办公室机构编制委员会办公室机构编制委员会办公室',
      outCompany: '人社局'
    }
  ]

  const columns = [
    {
      key: 'outCompany',
      title: <div style={{ textAlign: "center" }}>调出单位</div>,
      dataIndex: 'outCompany',
      width: 260,
      render: () => (
        <FormItem>
          {
            getFieldDecorator('outCompany',{
              rules:[
                {
                  required:true,
                  message:'请选择内容',
                  trigger:"onBlur"
                }
              ]
            })(
              <Select
                style={{ width: "100%" }}
                mode="combobox"
                optionFilterProp="children"
                optionLabelProp="children"
              >
                {
                  companys.map(item => (
                    <Option value={item._id}>{item.companyName}</Option>
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
      render: () => (
        <Select
          style={{ width: "100%" }}
          showSearch
          optionFilterProp="children"
          optionLabelProp="children"
        >
          {
            companys.map(item => (
              <Option value={item._id}>{item.companyName}</Option>
            ))
          }
        </Select>
      )
    },
    {
      key: 'name',
      title: <div style={{ textAlign: "center" }}>姓名</div>,
      dataIndex: 'name',
      width: 160,
      render: () => (
        <Input />
      )
    },
    {
      key: 'IDCard',
      title: <div style={{ textAlign: "center" }}>身份证号</div>,
      dataIndex: 'IDCard',
      width: 200,
      render: () => (
        <Input />
      )
    },
    {
      key: 'quantityName',
      title: <div style={{ textAlign: "center" }}>编制性质</div>,
      dataIndex: 'quantityName',
      width: 170,
      render: () => (
        <Select style={{ width: "100%" }}>
          <Option value="quantityXZ">行政</Option>
          <Option value="quantityZF">政法</Option>
          <Option value="quantityGQ">工勤</Option>
          <Option value="quantityQE">全额拨款事业</Option>
          <Option value="quantityCE">差额拨款事业</Option>
          <Option value="quantityZS">自收自支事业</Option>
        </Select>
      )
    },
    {
      key: 'option',
      title: <div style={{ textAlign: "center" }}>操作</div>,
      render: () => (
        <div style={{ textAlign: "center" }}>
          <a>新增</a>
          <Divider type="vertical" />
          <a>删除</a>
        </div>
      )
    }
  ]
  return (
    <Card style={{ margin: "24px 24px 0" }}>
      <Form>
        <Table rowKey={record => record.outCompany} columns={columns} dataSource={dataSource} style={{ marginTop: 24 }} bordered  />
      </Form>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Button type="primary" style={{ marginRight: 40 }}>确定</Button>
        <Button>取消</Button>
      </div>
    </Card>
  )
}

function mapStateToProps(state) {
  return { quantity: state.quantity }
}

export default connect(mapStateToProps)(Form.create()(QuantityAdd));
