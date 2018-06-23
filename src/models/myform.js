import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '../services/api';

export default {
  namespace: 'myform',

  state: {
    editable: false,
    dataSource: [
      {
        key: '1',
        name: 'John Brown',
        sn: '00001',
        department: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        sn: '00002',
        department: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        sn: '00003',
        department: 'Sidney No. 1 Lake Park',
      },
    ]
  },

  effects: {

  },

  reducers: {
    changeEditable(state, { payload: editable }) {
      return { ...state, editable }
    },
    addRow(state, { payload: data }) {
      const dataSource = [...state.dataSource,data];
      return { ...state, dataSource }
    }
  },
};
