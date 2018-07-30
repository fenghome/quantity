import React from 'react';
import { Card, Form, Input, Row, Col, Button, Icon, Table, Divider, Select } from 'antd';
import { Switch, Route, Redirect, Link } from 'dva/router';
import styles from './index.less';
import { getRoutes } from '../../utils/utils';
import QuantityLayout from './QuantityLayout';
import PageHeader from '../../components/PageHeader';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Search = Input.Search;

const Quantity = ({ form, match, routerData, location }) => {

  return (
    <div style={{ margin: "-24px -24px 0" }}>
      <PageHeader tabActiveKey={location.pathname} linkElement={Link}/>
      <Switch>
        {
          getRoutes(match.path, routerData).map(item => (
            <Route
              key={item.key}
              exact={item.exact}
              path={item.path}
              component={item.component}
            />
          ))
        }
        <Redirect from='/quantity' to='/quantity/list' />
      </Switch>
    </div>
  )
}

export default Form.create()(Quantity);
