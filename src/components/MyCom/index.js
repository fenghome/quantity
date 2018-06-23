import React from 'react';
import { Select } from 'antd';
import styles from './index.less';
const Option = Select.Option;

export default () => {
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }
  return (

      <Select
        mode="multiple"
        style={{ width: 300 }}
        placeholder="Please select"

      >
        {children}
      </Select>


  )
}
