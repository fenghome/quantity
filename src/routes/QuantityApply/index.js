import React from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, Input, Table, Divider } from 'antd';
import PageHeader from '../../components/PageHeader';
import QuantityApplyForm from '../../components/QuantityApply/QuantityApplyForm';
const Search = Input.Search;

const QuantityApply = ({ dispatch, quantityApply, loading }) => {
  const { quantityApplys } = quantityApply;
  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>编号</div>,
      dataIndex: 'quantityApplyId',
      key: 'quantityApplyId',
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>单位名称</div>,
      dataIndex: 'company.companyName',
      key: 'company.companyName',
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
      title: <div style={{ textAlign: "center" }}>拟用编制数</div>,
      dataIndex: 'applyNumber',
      key: 'applyNumber',
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
          <a>删除</a>
        </div>
      )
    }
  ];
  const dataSource = [
    {
      quantityApplyId: '001',
      company: '编办',
      quantityType: '行政',
      number: 1,
    }
  ];

  const showAddForm = () => {
    dispatch({ type: 'quantityApply/showAddForm' });
  }

  const showUpdateForm = (record) => {
    dispatch({
      type: 'quantityApply/showUpdateForm',
      payload: record
    });
  }

  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader title="编制申请" />
      <Card style={{ margin: "24px 24px 0" }}>
        <div>
          <Button type="primary" onClick={showAddForm}><Icon type="plus" />新增</Button>
          <Search placeholder="请输入" style={{ width: 240, float: "right" }} />
        </div>
        <Table
          columns={columns}
          dataSource={quantityApplys}
          rowKey={record => record._id}
          loading={loading}
          bordered
          style={{ marginTop: "24px" }}
        />
      </Card>
      <QuantityApplyForm />
    </div>
  )
}

function mapStateToProps(state) {
  return { quantityApply: state.quantityApply, loading: state.loading.models.quantityApply }
}
export default connect(mapStateToProps)(QuantityApply);
