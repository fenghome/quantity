import React from 'react';
import { Card, Form, Input, Row, Col, Button, Icon, Table, Divider, Select } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Search = Input.Search;

const QuantityList = ({ form, match, routerData, dispatch, quantity,loading }) => {

  const { quantitys } = quantity;
  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>列编卡号</div>,
      dataIndex: 'quantityId',
      key: 'quantityId',
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>姓名</div>,
      dataIndex: 'employee.name',
      key: 'employee.name',
      render: (text,record) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>身份证号</div>,
      dataIndex: 'employee.IDCard',
      key: 'employee.IDCard',
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>编制类型</div>,
      dataIndex: 'quantityName',
      key: 'quantityName',
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>调入单位</div>,
      dataIndex: 'inCompanyName',
      key: 'inCompanyName',
      width: 300,
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>调出单位</div>,
      dataIndex: 'outCompanyName',
      key: 'outCompanyName',
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>操作</div>,
      key: 'option',
      render: () => (
        <div style={{ textAlign: "center" }}>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
          <Divider type="vertical" />
          <a>打印</a>
        </div>
      )
    }
  ];

  const dataSource = [
    {
      quantityId: '001',
      name: '张三',
      IDCard: '13010519790402112',
      quantityType: '行政',
      inCompany: '机构编制委员会办公室机构编制委员会办公室机构编制委员会办公室',
      outCompany: '人社局'
    }
  ]

  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }

  const singleForm = (
    <Form layout="inline">
      <Row gutter={24}>
        <Col span={6}>
          <FormItem label={<span>列编卡号</span>} style={{ width: "100%" }} {...formItemLayout}>
            {
              getFieldDecorator('quantityId')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={6} >
          <FormItem label={<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>} style={{ width: "100%" }} {...formItemLayout}>
            {
              getFieldDecorator('name')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={6} >
          <FormItem label="身份证号" style={{ width: "100%" }} {...formItemLayout}>
            {
              getFieldDecorator('IDCard')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem >
            <Button type="primary" style={{ marginRight: 8 }}>查询</Button>
            <Button style={{ marginRight: 8 }}>重置</Button>
            <a>展开<Icon type="down" /></a>
          </FormItem>

        </Col>
      </Row>
    </Form>
  );

  const advanceForm = (
    <Form layout="inline">
      <Row gutter={24}>
        <Col span={6}>
          <FormItem label={<span>列编卡号</span>}

            {...formItemLayout}
          >
            {
              getFieldDecorator('quantityId')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={6} >
          <FormItem
            label={<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>}

            {...formItemLayout}
          >
            {
              getFieldDecorator('name')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={6} >
          <FormItem label="身份证号"

            {...formItemLayout}
          >
            {
              getFieldDecorator('IDCard')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={6} >
          <FormItem label="编制性质"

            {...formItemLayout}
          >
            {
              getFieldDecorator('quantityType')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={6}  >
          <FormItem label="调入单位"

            {...formItemLayout}
          >
            {
              getFieldDecorator('inCompany')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={6}  >
          <FormItem label="调出单位"

            {...formItemLayout}
          >
            {
              getFieldDecorator('outCompany')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={6} offset={6}>
          <FormItem >
            <Button type="primary" style={{ marginRight: 8 }}>查询</Button>
            <Button style={{ marginRight: 8 }}>重置</Button>
            <a>展开<Icon type="down" /></a>
          </FormItem>
        </Col>
      </Row>

    </Form>
  )

  const onAddQuantity = () => {
    const myDate = new Date();
    const year = myDate.getFullYear();
    const quantityId = `Q${year}` + `0000${quantitys.length + 1}`.slice(-4);
    dispatch({
      type:'quantity/setCurrQuantityId',
      payload:quantityId
    })
    dispatch(routerRedux.push('/quantity/add'));
  }

  return (

    <Card style={{ margin: "24px 24px 0" }}>
      <InputGroup compact style={{ float: "right", width: 340 }}>
        <Select style={{ width: "30%" }}>
          <Option key="quantityID">列编卡号</Option>
          <Option key="name">姓名</Option>
          <Option key="IDCard">身份证号</Option>
          <Option key="quantityType">编制类型</Option>
          <Option key="inCompany">调入单位</Option>
          <Option key="outCompany">调入单位</Option>
        </Select>
        <Search enterButton onSearch={(value) => searchEmployee(value)} style={{ width: "70%" }} />
      </InputGroup>
      <Button type="primary" onClick={onAddQuantity}><Icon type="plus" />新增</Button>
      <Table
        rowKey="quantityId"
        loading={loading}
        columns={columns}
        dataSource={quantitys}
        style={{ marginTop: 24 }}
        bordered
      />
    </Card>

  )
}

function mapStateToProps(state) {
  return { quantity: state.quantity,loading:state.loading.models.quantity }
}

export default connect(mapStateToProps)(Form.create()(QuantityList));
