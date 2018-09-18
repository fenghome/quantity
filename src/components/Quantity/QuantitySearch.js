import React from 'react';
import { Card, Form, Input, Row, Col, Button, Icon, Table, Divider, Select, Popconfirm } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Search = Input.Search;
const Option = Select.Option;

const QuantitySearch = ({ form, match, routerData, dispatch, quantity,loading }) => {

  const { filterQuantity,searchKey } = quantity;
  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>列编卡号</div>,
      dataIndex: 'quantityId',
      key: 'quantityId',
      render: (text,row,index) => (
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
      render:  (text,row,index) => (
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
    
  ];

  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }

  const onAddQuantity = () => {
    const myDate = new Date();
    const year = myDate.getFullYear();
    let SNnumber = 1;
    if(quantitys.length>0){
      SNnumber = parseInt(quantitys[quantitys.length-1].quantityId.slice(-4)) + 1;
    }
    const quantityId = `Q${year}` + `0000${SNnumber}`.slice(-4);
    dispatch({
      type:'quantity/setCurrQuantityId',
      payload:quantityId
    })
    dispatch(routerRedux.push('/quantity/add'));
  }

  const onDeleteQuantity = (quantityId)=>{
    dispatch({
      type:'quantity/deleteQuantity',
      payload:quantityId
    });
  }

  const onSearchQuantity = (value)=>{
    dispatch({
      type:'quantity/searchQuantity',
      payload:{
        key:searchKey,
        value:value
      }
    })
  }

  const onSelectSearchKey = (value)=>{
    dispatch({
      type:'quantity/setSearchKey',
      payload:value
    })
  }

  const goQuantityList = ()=>{
    dispatch(routerRedux.push('/quantity/list'));
  }

  return (

    <Card style={{ margin: "24px 24px 0" }}>
      <InputGroup compact style={{ float: "right", width: 340}}>
        <Select
          style={{ width: "30%" }}
          defaultValue="quantityId"
          onBlur={(key)=>{onSelectSearchKey(key)}}>
          <Option key="quantityId">列编卡号</Option>
          <Option key="name">姓名</Option>
          <Option key="IDCard">身份证号</Option>
          <Option key="quantityName">编制类型</Option>
          <Option key="inCompany">调入单位</Option>
          <Option key="outCompany">调出单位</Option>
        </Select>
        <Search enterButton onSearch={(value) => onSearchQuantity(value)} style={{ width: "70%" }} />
      </InputGroup>
      <Button type="primary" onClick={goQuantityList}><Icon type="left" />返回</Button>
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={filterQuantity}
        style={{ marginTop: 24 }}
        bordered
      />
    </Card>

  )
}

function mapStateToProps(state) {
  return { quantity: state.quantity,loading:state.loading.models.quantity }
}

export default connect(mapStateToProps)(Form.create()(QuantitySearch));
