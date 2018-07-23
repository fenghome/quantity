import React from 'react';
import { Card, Form, Input, Row, Col, Button, Icon, Table, Divider, Select } from 'antd';
import { Switch, Route, Redirect } from 'dva/router';
import QuantityLayout from './QuantityLayout';
import styles from './index.less';
import { getRoutes } from '../../utils/utils';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Search = Input.Search;

const Quantity = ({ form, match, routerData, location }) => {

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
      title: <div style={{ textAlign: "center" }}>调入单位</div>,
      dataIndex: 'inCompany',
      key: 'inCompany',
      width: 300,
      render: (text) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>调出单位</div>,
      dataIndex: 'outCompany',
      key: 'outCompany',
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
          <FormItem className={styles.formItemStyle} >
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
            className={styles.formItemStyle}
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
            className={styles.formItemStyle}
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
            className={styles.formItemStyle}
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
            className={styles.formItemStyle}
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
            className={styles.formItemStyle}
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
            className={styles.formItemStyle}
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
          <FormItem className={styles.formItemStyle} >
            <Button type="primary" style={{ marginRight: 8 }}>查询</Button>
            <Button style={{ marginRight: 8 }}>重置</Button>
            <a>展开<Icon type="down" /></a>
          </FormItem>
        </Col>
      </Row>

    </Form>
  )

  return (

    <Switch>
      {
        getRoutes(match.path, routerData).map(item => {
          const currCom = routerData[item.path].component;
          return
          <Route
            key={item.key}
            path={item.path}
            render={
              props => <QuantityLayout comp={currCom} {...props} />
            }
            exact={item.exact}
          />

        })
      }
      <Redirect exact from="/quantity/" to="/quantity/list" />

    </Switch>

  )
}

export default Form.create()(Quantity);
