import React from 'react';
import { Card, Button, Icon, Input, Table, Divider } from 'antd';
import { connect } from 'dva';
import PageHeader from '../../components/PageHeader';
import CompanyForm from '../../components/Company/CompanyForm';

const Search = Input.Search;

const Company = ({ dispatch, company }) => {
  const { companys } = company;
  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>单位名称</div>,
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          {text}
        </div>
      ),
      width: 200
    },
    {
      title: <div style={{ textAlign: "center" }}>行政</div>,
      children: [
        {
          title: <div style={{ textAlign: "center" }}>编制</div>,
          dataIndex: 'quantityXZ',
          key: 'quantityXZ',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center"}}>实有</div>,
          dataIndex: 'infactXZ',
          key: 'infactXZ',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12  }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>拟用</div>,
          dataIndex: 'applyXZ',
          key: 'applyXZ',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        }
      ]
    },
    {
      title: <div style={{ textAlign: "center" }}>政法</div>,
      children: [
        {
          title: <div style={{ textAlign: "center" }}>编制</div>,
          dataIndex: 'quantityZF',
          key: 'quantityZF',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>实有</div>,
          dataIndex: 'infactZF',
          key: 'infactZF',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>拟用</div>,
          dataIndex: 'applyZF',
          key: 'applyZF',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        }
      ]
    },
    {
      title: <div style={{ textAlign: "center" }}>工勤</div>,
      children: [
        {
          title: <div style={{ textAlign: "center" }}>编制</div>,
          dataIndex: 'quantityGQ',
          key: 'quantityGQ',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>实有</div>,
          dataIndex: 'infactGQ',
          key: 'infactGQ',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>拟用</div>,
          dataIndex: 'applyGQ',
          key: 'applyGQ',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        }
      ]
    },
    {
      title: <div style={{ textAlign: "center" }}>全额拨款</div>,
      children: [
        {
          title: <div style={{ textAlign: "center" }}>编制</div>,
          dataIndex: 'quantityQE',
          key: 'quantityQE',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>实有</div>,
          dataIndex: 'infactQE',
          key: 'infactQE',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>拟用</div>,
          dataIndex: 'applyQE',
          key: 'applyQE',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        }
      ]
    },
    {
      title: <div style={{ textAlign: "center" }}>差额拨款</div>,
      children: [
        {
          title: <div style={{ textAlign: "center" }}>编制</div>,
          dataIndex: 'quantityCE',
          key: 'quantityCE',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>实有</div>,
          dataIndex: 'infactCE',
          key: 'infactCE',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>拟用</div>,
          dataIndex: 'applyCE',
          key: 'applyCE',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        }
      ]
    },
    {
      title: <div style={{ textAlign: "center" }}>自收自支</div>,
      children: [
        {
          title: <div style={{ textAlign: "center" }}>编制</div>,
          dataIndex: 'quantityZS',
          key: 'quantityZS',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>实有</div>,
          dataIndex: 'infactZS',
          key: 'infactZS',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        },
        {
          title: <div style={{ textAlign: "center" }}>拟用</div>,
          dataIndex: 'applyZS',
          key: 'applySZ',
          render: (text) => (
            <div style={{ textAlign: "center", fontSize: 12 }}>
              {text}
            </div>
          )
        }
      ]
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
      ),
      width: 120
    }
  ];


  const showForm = () => {
    dispatch({
      type: 'company/showForm'
    })
  }

  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader title="单位管理" />
      <Card style={{ margin: "24px 24px 0" }}>
        <div>
          <Button type="primary"  onClick={showForm}><Icon type="plus" />新增</Button>
          <Search placeholder="请输入" style={{ width: 240, float: "right" }} />
        </div>
        <Table columns={columns} dataSource={companys} bordered style={{ marginTop: "24px" }} />
      </Card>
      <CompanyForm />
    </div>
  )
}

export default connect(({ company }) => ({ company }))(Company);
