import React from 'react';
import { Card, Form, Input, Row, Col, Button, Icon, Table, Divider } from 'antd';
import { connect } from 'dva';
import PageHeader from '../../components/PageHeader';
import EmployeeForm from '../../components/Employee/EmployeeForm';
import styles from './index.less';
const FormItem = Form.Item;


const Employee = ({ dispatch, form, employee }) => {
  const { searchFormOpen } = employee;

  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>所在单位</div>,
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>姓名</div>,
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>身份证号</div>,
      dataIndex: 'IDCard',
      key: 'IDCard',
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>编制类型</div>,
      dataIndex: 'quantityType',
      key: 'quantityType',
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
        </div>
      )
    }
  ];

  const dataSource = [
    {
      companyName: '机构编制委员会办公室',
      name: '张三',
      IDCard: '13010519790402112',
      quantityType: '行政',
    }
  ]

  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  }

  const singleForm = (
    <Form layout="inline">
      <Row gutter={24}>
        <Col span={8}>
          <FormItem
            label={<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>}
            { ...formItemLayout }
            style={{ marginBottom: 24, width: "100%" }}
          >
            {
              getFieldDecorator('name')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="身份证号"
            { ...formItemLayout }
            style={{ marginBottom: 24, width: "100%" }}
          >
            {
              getFieldDecorator('IDCard')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8}  >
          <FormItem style={{ marginBottom: 24 }}>
            <Button type="primary" style={{ marginRight: 8 }}>查询</Button>
            <Button style={{ marginRight: 8 }}>重置</Button>
            <a onClick={() => openSearchForm()}>展开<Icon type="down" /></a>
          </FormItem>

        </Col>
      </Row>
    </Form>
  );

  const advanceForm = (
    <Form layout="inline">
      <Row gutter={24}>
        <Col span={8} >
          <FormItem
            label={<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>}
            { ...formItemLayout }
            style={{ marginBottom: 24, width: "100%" }}
          >
            {
              getFieldDecorator('name')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8} >
          <FormItem label="身份证号"
            { ...formItemLayout }
            style={{ marginBottom: 24, width: "100%" }}
          >
            {
              getFieldDecorator('IDCard')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8} >
          <FormItem label="编制性质"
            { ...formItemLayout }
            style={{ marginBottom: 24, width: "100%" }}
          >
            {
              getFieldDecorator('quantityType')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8}  >
          <FormItem label="所在单位"
            { ...formItemLayout }
            style={{ marginBottom: 24, width: "100%" }}
          >
            {
              getFieldDecorator('inCompany')(
                <Input style={{ width: "100%" }} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8} offset={8}>
          <FormItem style={{ marginBottom: 24 }}>
            <Button type="primary" style={{ marginRight: 8 }}>查询</Button>
            <Button style={{ marginRight: 8 }}>重置</Button>
            <a onClick={() => closeSearchForm()}>收起<Icon type="up" /></a>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )

  const openSearchForm = () => {
    console.log('aaaa');
    dispatch({
      type: 'employee/setSearchForm',
      payload: true
    })
  }

  const closeSearchForm = () => {
    dispatch({
      type: 'employee/setSearchForm',
      payload: false
    })
  }

  const showEmployeeForm = () =>{
    dispatch({
      type:'employee/showEmployeeForm'
    })
  }

  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader title="人员管理" />
      <Card style={{ margin: "24px 24px 0" }}>
        {searchFormOpen ? advanceForm : singleForm}
        <Button
          type="primary"
          onClick={showEmployeeForm}
        ><Icon type="plus" />新增</Button>
        <Table columns={columns} dataSource={dataSource} bordered style={{ marginTop: 24 }} />
      </Card>
      <EmployeeForm />
    </div>
  )
}

function mapStateToProps(state) {
  return { employee: state.employee }
}

export default connect(mapStateToProps)(Form.create()(Employee));
