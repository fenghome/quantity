import React from 'react';
import { Input, Card, Form, Select } from 'antd';
import PageHeader from '../../../components/PageHeader';
import StandardFormRow from '../../../components/StandardFormRow';
import TagSelect from '../../../components/TagSelect';
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

const MyForm = ({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader
        title="搜索列表"
        content={
          <div style={{ textAlign: "center" }}>
            <Search size="large" placeholder="请输入" enterButton="搜索" style={{ width: 500 }} />
          </div>
        }
        tabList={[
          { key: 'articles', tab: '文章' },
          { key: 'applications', tab: '应用' },
          { key: 'projects', tab: '项目' }
        ]}
        tabActiveKey="applications"
      />
      <Card bordered={false} style={{ margin: "24px 24px 0" }}>
        <Form layout="inline">
          <StandardFormRow title="所属类目" >
            <FormItem>
              {
                getFieldDecorator('select')(
                  <TagSelect expandable>
                    <TagSelect.Option value="0">全部</TagSelect.Option>
                    <TagSelect.Option value="1">全部</TagSelect.Option>
                    <TagSelect.Option value="2">全部</TagSelect.Option>
                    <TagSelect.Option value="3">全部</TagSelect.Option>
                    <TagSelect.Option value="0">全部</TagSelect.Option>
                  </TagSelect>
                )
              }
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="其他选项">
            <FormItem label="作者">
            {
              getFieldDecorator('auth')(
                <Select style={{width:200,marginRight:100}}>
                  <Option value="zs">张三</Option>
                  <Option value="ls">李四</Option>
                </Select>
              )
            }
            </FormItem>
            <FormItem label="喜欢">
            {
              getFieldDecorator('likes')(
                <Select style={{width:200}}>
                  <Option value="like">喜欢</Option>
                  <Option value="noLike">不喜欢</Option>
                </Select>
              )
            }
            </FormItem>
          </StandardFormRow>
        </Form>
      </Card>
    </div>
  )
}

export default Form.create()(MyForm);
