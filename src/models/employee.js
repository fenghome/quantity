import request from '../utils/request';
import { message } from 'antd';

export default {
  namespace: 'employee',
  state: {
    searchFormOpen: false,
    employees: [],
    formVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/employee') {
          // dispatch({
          //   type: 'reloadState'
          // })
        }
      });
    },
  },

  effects: {

    *reloadState(action, { call, put }) {
      yield put({ type: 'initState' });
      yield put({ type: 'getEmployees' });
    },

    *getEmployees(action, { call, put }) {
      const res = yield call(request, `/api/employee`, {
        method: 'GET'
      });
      yield put({ type: 'setEmployees', payload: (res.data || []) })
    },


  },

  reducers: {
    initState(state, action) {
      return {
        searchFormOpen: false,
        employees: [],
      }
    },

    setEmployees(state, { payload: employees }) {
      return { ...state, employees }
    },

    setSearchForm(state, { payload: searchFormOpen }) {
      return { ...state, searchFormOpen }
    },

    showEmployeeForm(state, action) {
      return { ...state, formVisible: true }
    },

    hideEmployeeForm(state, action) {
      return { ...state, formVisible: false }
    }
  }
}
