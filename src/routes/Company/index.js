import React from 'react';
import { Card, Button, Icon, Input, Table, Divider } from 'antd';
import PageHeader from '../../components/PageHeader';
const Search = Input.Search;

const Company = () => {
  const columns=[
    {
      title:<div style={{textAlign:"center"}}>单位编号</div>,
      dataIndex:'companyId',
      key:'companyId',
      render:(text)=>(
        <div style={{textAlign:"center"}}>
          {text}
        </div>
      )
    },
    {
      title:<div style={{textAlign:"center"}}>单位名称</div>,
      dataIndex:'company',
      key:'company',
      render:(text)=>(
        <div style={{textAlign:"center"}}>
          {text}
        </div>
      ),
      width:240
    },
    {
      title:<div style={{textAlign:"center"}}>行政</div>,
      children:[
        {
          title:<div style={{textAlign:"center"}}>编制</div>,
          dataIndex:'quantityXZ',
          key:'quantityXZ',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        },
        {
          title:<div style={{textAlign:"center"}}>实有</div>,
          dataIndex:'infactXZ',
          key:'infactXZ',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        }
      ]
    },
    {
      title:<div style={{textAlign:"center"}}>政法</div>,
      children:[
        {
          title:<div style={{textAlign:"center"}}>编制</div>,
          dataIndex:'quantityZF',
          key:'quantityZF',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        },
        {
          title:<div style={{textAlign:"center"}}>实有</div>,
          dataIndex:'infactZF',
          key:'infactZF',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        }
      ]
    },
    {
      title:<div style={{textAlign:"center"}}>工勤</div>,
      children:[
        {
          title:<div style={{textAlign:"center"}}>编制</div>,
          dataIndex:'quantityGQ',
          key:'quantityGQ',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        },
        {
          title:<div style={{textAlign:"center"}}>实有</div>,
          dataIndex:'infactGQ',
          key:'infactGQ',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        }
      ]
    },
    {
      title:<div style={{textAlign:"center"}}>全额拨款</div>,
      children:[
        {
          title:<div style={{textAlign:"center"}}>编制</div>,
          dataIndex:'quantityQE',
          key:'quantityQE',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        },
        {
          title:<div style={{textAlign:"center"}}>实有</div>,
          dataIndex:'infactQE',
          key:'infactQE',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        }
      ]
    },
    {
      title:<div style={{textAlign:"center"}}>差额拨款</div>,
      children:[
        {
          title:<div style={{textAlign:"center"}}>编制</div>,
          dataIndex:'quantityCE',
          key:'quantityCE',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        },
        {
          title:<div style={{textAlign:"center"}}>实有</div>,
          dataIndex:'infactCE',
          key:'infactCE',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        }
      ]
    },
    {
      title:<div style={{textAlign:"center"}}>自收自支</div>,
      children:[
        {
          title:<div style={{textAlign:"center"}}>编制</div>,
          dataIndex:'quantityZS',
          key:'quantityZS',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        },
        {
          title:<div style={{textAlign:"center"}}>实有</div>,
          dataIndex:'infactZS',
          key:'infactZS',
          render:(text)=>(
            <div style={{textAlign:"center"}}>
              {text}
            </div>
          )
        }
      ]
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
      companyId:'001',
      company:'编办',
      quantityXZ:10,
      infactXZ:6,
      quantityZF:0,
      infactZF:0,
      quantityGQ:0,
      infactGQ:0,
      quantityQE:0,
      infactQE:0,
      quantityCE:0,
      infactCE:0,
      quantityZS:0,
      infactZS:0
    }
  ];

  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader title="单位管理" />
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

export default Company;
