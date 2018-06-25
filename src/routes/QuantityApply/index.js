import React from 'react';
import { Card, Button, Icon, Input, Table, Divider } from 'antd';
import PageHeader from '../../components/PageHeader';
const Search = Input.Search;

const QuantityApply = () => {
  const columns=[
    {
      title:<div style={{textAlign:"center"}}>编号</div>,
      dataIndex:'quantityApplyId',
      key:'quantityApplyId',
      render:(text)=>(
        <div style={{textAlign:"center"}}>{text}</div>
      )
    },
    {
      title:<div style={{textAlign:"center"}}>单位名称</div>,
      dataIndex:'company',
      key:'company',
      render:(text)=>(
        <div style={{textAlign:"center"}}>{text}</div>
      )
    },
    {
      title:<div style={{textAlign:"center"}}>编制类型</div>,
      dataIndex:'quantityType',
      key:'quantityType',
      render:(text)=>(
        <div style={{textAlign:"center"}}>{text}</div>
      )
    },
    {
      title:<div style={{textAlign:"center"}}>拟用编制数</div>,
      dataIndex:'number',
      key:'number',
      render:(text)=>(
        <div style={{textAlign:"center"}}>{text}</div>
      )
    },
    {
      title:<div style={{textAlign:"center"}}>操作</div>,
      key:'option',
      render:()=>(
        <div style={{textAlign:"center"}}>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </div>
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
        <Table columns={columns} dataSource={dataSource} bordered style={{marginTop:"24px"}}/>
      </Card>
    </div>
  )
}

export default QuantityApply;
