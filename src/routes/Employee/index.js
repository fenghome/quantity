import React from 'react';
import { Card, Form, Input, Row, Col, Button, Icon, Table, Divider, Popconfirm, Select } from 'antd';
import { connect } from 'dva';
import PageHeader from '../../components/PageHeader';
import EmployeeForm from '../../components/Employee/EmployeeForm';
import styles from './index.less';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Search = Input.Search;

const Employee = ({ dispatch, form, employee, loading }) => {
  const { searchFormOpen, employees, searchKey } = employee;

  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>所在单位</div>,
      dataIndex: 'company.companyName',
      key: 'company.companyName',
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
      dataIndex: 'quantityName',
      key: 'quantityName',
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>操作</div>,
      key: 'option',
      render: (text, record, index) => (
        <div style={{ textAlign: "center" }}>
          <a onClick={() => showUpdateForm(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定删除该人员吗?" onConfirm={() => { deleteEmployee(record) }} okText="是" cancelText="否">
            <a href="#">删除</a>
          </Popconfirm>
        </div>
      )
    }
  ];

  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  }



  // const singleForm = (
  //   <Form layout="inline">
  //     <Row gutter={24}>
  //       <Col span={8}>
  //         <FormItem
  //           label={<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>}
  //           { ...formItemLayout }
  //           style={{ marginBottom: 24, width: "100%" }}
  //         >
  //           {
  //             getFieldDecorator('name')(
  //               <Input style={{ width: "100%" }} />
  //             )
  //           }
  //         </FormItem>
  //       </Col>
  //       <Col span={8}>
  //         <FormItem label="身份证号"
  //           { ...formItemLayout }
  //           style={{ marginBottom: 24, width: "100%" }}
  //         >
  //           {
  //             getFieldDecorator('IDCard')(
  //               <Input style={{ width: "100%" }} />
  //             )
  //           }
  //         </FormItem>
  //       </Col>
  //       <Col span={8}  >
  //         <FormItem style={{ marginBottom: 24 }}>
  //           <Button type="primary" style={{ marginRight: 8 }}>查询</Button>
  //           <Button style={{ marginRight: 8 }}>重置</Button>
  //           <a onClick={() => openSearchForm()}>展开<Icon type="down" /></a>
  //         </FormItem>

  //       </Col>
  //     </Row>
  //   </Form>
  // );

  // const advanceForm = (
  //   <Form layout="inline">
  //     <Row gutter={24}>
  //       <Col span={8} >
  //         <FormItem
  //           label={<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>}
  //           { ...formItemLayout }
  //           style={{ marginBottom: 24, width: "100%" }}
  //         >
  //           {
  //             getFieldDecorator('name')(
  //               <Input style={{ width: "100%" }} />
  //             )
  //           }
  //         </FormItem>
  //       </Col>
  //       <Col span={8} >
  //         <FormItem label="身份证号"
  //           { ...formItemLayout }
  //           style={{ marginBottom: 24, width: "100%" }}
  //         >
  //           {
  //             getFieldDecorator('IDCard')(
  //               <Input style={{ width: "100%" }} />
  //             )
  //           }
  //         </FormItem>
  //       </Col>
  //       <Col span={8} >
  //         <FormItem label="编制性质"
  //           { ...formItemLayout }
  //           style={{ marginBottom: 24, width: "100%" }}
  //         >
  //           {
  //             getFieldDecorator('quantityType')(
  //               <Input style={{ width: "100%" }} />
  //             )
  //           }
  //         </FormItem>
  //       </Col>
  //       <Col span={8}  >
  //         <FormItem label="所在单位"
  //           { ...formItemLayout }
  //           style={{ marginBottom: 24, width: "100%" }}
  //         >
  //           {
  //             getFieldDecorator('inCompany')(
  //               <Input style={{ width: "100%" }} />
  //             )
  //           }
  //         </FormItem>
  //       </Col>
  //       <Col span={8} offset={8}>
  //         <FormItem style={{ marginBottom: 24 }}>
  //           <Button type="primary" style={{ marginRight: 8 }}>查询</Button>
  //           <Button style={{ marginRight: 8 }}>重置</Button>
  //           <a onClick={() => closeSearchForm()}>收起<Icon type="up" /></a>
  //         </FormItem>
  //       </Col>
  //     </Row>
  //   </Form>
  // )

  const openSearchForm = () => {
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

  const showEmployeeForm = () => {
    dispatch({
      type: 'employee/showEmployeeForm'
    })
  }

  const showUpdateForm = (record) => {
    dispatch({
      type: 'employee/showUpdateForm',
      payload: record
    })
  }

  const deleteEmployee = (record) => {
    dispatch({
      type: 'employee/deleteEmployee',
      payload: record
    })
  }

  const selectSearchKey = (key) => {
    dispatch({
      type: 'employee/setSearchKey',
      payload: key
    })
  }

  const searchEmployee = (value) => {
    dispatch({
      type: 'employee/searchEmployee',
      payload: value
    })
  }

  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader title="人员管理" />
      <Card style={{ margin: "24px 24px 0" }}>
        <Button type="primary" onClick={showEmployeeForm}><Icon type="plus" />新增</Button>
        <InputGroup compact style={{ float: "right", width: 340 }}>
          <Select defaultValue={searchKey} onSelect={() => selectSearchKey(key)} style={{ width: "30%" }}>
            <Option key="name">姓名</Option>
            <Option key="companyName">所属单位</Option>
            <Option key="IDCard">身份证号</Option>
            <Option key="quantityType">编制类型</Option>
          </Select>
          <Search enterButton onSearch={(value) => searchEmployee(value)} style={{ width: "70%" }} />
        </InputGroup>
        <Table
          columns={columns}
          dataSource={employees}
          loading={loading}
          bordered
          rowKey={(record) => record._id}
          style={{ marginTop: 24 }}
        />
      </Card>
      <EmployeeForm />
    </div>
  )
}

function mapStateToProps(state) {
  return { employee: state.employee, loading: state.loading.models.employee }
}

export default connect(mapStateToProps)(Form.create()(Employee));
