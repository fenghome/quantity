import React from 'react';
import { Steps } from 'antd';
import { Switch, Route, Redirect } from 'dva/router';
import PageHeader from '../../../components/PageHeader';
import { getMenuData } from '../../../common/menu';
import { getRoutes } from '../../../utils/utils';
import StepCenter from './StepContent';
const Step = Steps.Step;

const StepContent = ({ StepCenter }) => {

  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader
        title="分步表单"
        content="这是我制作的一个分步表单"
      >
      </PageHeader>
      <div style={{ margin: "24px 24px 0", background: "#fff", }}>
        <Steps current={0} style={{margin:"0 auto",padding:"24px 0",maxWidth:750}}>
          <Step title="填写转账信息" />
          <Step title="确认转账信息" />
          <Step title="完成" />
        </Steps>
        <div  style={{margin:"0 auto",maxWidth:500}}>
          <StepCenter />
        </div>

      </div>
    </div>
  )
}

export default StepContent;
