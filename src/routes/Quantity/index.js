import React from 'react';
import { Card, Form, Input, Row, Col, Button, Icon, Table, Divider } from 'antd';
import PageHeader from '../../components/PageHeader';
import styles from './index.less';
const FormItem = Form.Item;


const Quantity = ({ form }) => {

  const columns = [
    {
      title:'列编卡号',
      dataIndex:'quantityId',
      key:'quantityId',
    },
    {
      title:'姓名',
      dataIndex:'name',
      key:'name'
    },
    {
      title:'身份证号',
      dataIndex:'IDCard',
      key:'IDCard'
    },
    {
      title:'编制类型',
      dataIndex:'quantityType',
      key:'quantityType'
    },
    {
      title:'调入单位',
      dataIndex:'inCompany',
      key:'inCompany',
      width:300
    },
    {
      title:'调出单位',
      dataIndex:'outCompany',
      key:'outCompany'
    },
    {
      title:'操作',
      key:'option',
      render:()=>(
        <span>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
          <Divider type="vertical" />
          <a>打印</a>
        </span>
      )
    }
  ];

  const dataSource = [
    {
      quantityId:'001',
      name:'张三',
      IDCard:'13010519790402112',
      quantityType:'行政',
      inCompany:'机构编制委员会办公室机构编制委员会办公室机构编制委员会办公室',
      outCompany:'人社局'
    }
  ]

  const { getFieldDecorator } = form;


  const singleForm = (
    <Form layout="inline">
      <Row gutter={24}>
        <Col span={8}>
          <FormItem label={<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>} >
            {
              getFieldDecorator('name')(
                <Input />
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="身份证号" style={{textAlign:'center'}} >
            {
              getFieldDecorator('IDCard')(
                <Input />
              )
            }
          </FormItem>
        </Col>
        <Col span={8} >
          <FormItem wrapperCol={{ span: 16, offset: 8 }} style={{textAlign:'right'}}>
            <Button style={{ marginRight: 8 }}>查询</Button>
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
        <Col span={8} >
          <FormItem
            label={<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>}

            className={styles.formItemStyle}
          >
            {
              getFieldDecorator('name')(
                <Input style={{width:"100%"}} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8} >
          <FormItem label="身份证号"    className={styles.formItemStyle} style={{textAlign:"center"}}>
            {
              getFieldDecorator('IDCard')(
                <Input style={{width:"100%"}} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8} >
          <FormItem label="编制性质"    className={styles.formItemStyle} style={{textAlign:"right"}}>
            {
              getFieldDecorator('quantityType')(
                <Input style={{width:"100%"}} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8}  >
          <FormItem label="调入单位"    className={styles.formItemStyle}>
            {
              getFieldDecorator('inCompany')(
                <Input style={{width:"100%"}} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8}  >
          <FormItem label="调出单位"    className={styles.formItemStyle}  style={{textAlign:"center"}}>
            {
              getFieldDecorator('outCompany')(
                <Input style={{width:"100%"}} />
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem className={styles.formItemStyle}  style={{textAlign:"right"}}>
            <Button style={{ marginRight: 8 }}>查询</Button>
            <Button style={{ marginRight: 8 }}>重置</Button>
            <a>展开<Icon type="down" /></a>
          </FormItem>
        </Col>
      </Row>

    </Form>
  )

  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader title="列编管理" />
      <Card style={{ margin: "24px 24px 0" }}>
        {advanceForm}
        <Button type="primary"><Icon type="plus" />新增</Button>
        <Table columns={columns} dataSource={dataSource} style={{marginTop:24}} />
      </Card>

    </div>
  )
}

export default Form.create()(Quantity);
