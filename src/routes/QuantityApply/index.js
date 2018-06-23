import React from 'react';
import { Card, Button, Icon, Input, Table, Divider } from 'antd';
import PageHeader from '../../components/PageHeader';
const Search = Input.Search;

const QuantityApply = () => {
  const columns=[
    {
      title:'编号',
      dataIndex:'quantityApplyId',
      key:'quantityApplyId'
    },
    {
      title:'单位名称',
      dataIndex:'company',
      key:'company'
    },
    {
      title:'编制类型',
      dataIndex:'quantityType',
      key:'quantityType'
    },
    {
      title:'拟用编制数',
      dataIndex:'number',
      key:'number'
    },
    {
      title:'操作',
      key:'option',
      render:()=>(
        <span>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </span>
      )
    }
  ];
  const dataSource=[
    {
      quantityApplyId:'001',
      company:'编办',
      quantityType:'行政',
      number:1,
    }
  ];

  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader title="编制申请" />
      <Card style={{margin:"24px 24px 0"}}>
        <div>
          <Button type="primary"><Icon type="plus" />新增</Button>
          <Search placeholder="请输入" style={{width:240,float:"right"}}/>
        </div>
        <Table columns={columns} dataSource={dataSource} style={{marginTop:"24px"}}/>
      </Card>
    </div>
  )
}

export default QuantityApply;
