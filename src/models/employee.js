import request from '../utils/request';
import { message } from 'antd';

export default {
  namespace: 'employee',
  state: {
    searchKey: "name",
    employees: [],
    formVisible: false,
    currentEmployee: null,
    formModify: false,
    companys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/employee') {
          dispatch({
            type: 'reloadState'
          })
        }
      });
    },
  },

  effects: {

    *reloadState(action, { call, put }) {
      yield put({ type: 'initState' });
      yield put({ type: 'getEmployees' });
      yield put({ type: 'getCompanys' });
    },

    *getEmployees(action, { call, put }) {
      const res = yield call(request, `/api/employee`, {
        method: 'GET'
      });
      yield put({ type: 'setEmployees', payload: (res.data || []) })
    },

    *addEmployee({ payload: employee }, { call, put }) {
      const res = yield call(request, `/api/employee`, {
        method: 'POST',
        body: employee
      });
      if (!res.success) {
        message.info('新增人员失败');
      } else {
        yield put({ type: 'getEmployees' });
      }
    },

    *updateEmployee({ payload: employee }, { call, put }) {
      const res = yield call(request, `/api/employee`, {
        method: 'PUT',
        body: employee
      });
      if (!res.success) {
        message.info('更新失败');
      } else {
        yield put({ type: 'getEmployees' });
      }
    },

    *deleteEmployee({ payload: employee }, { call, put }) {
      let res = yield call(request, `/api/employee/${employee._id}/${employee.company._id}/${employee.quantityType}`, {
        method: 'DELETE'
      });
      res = JSON.parse(res);
      if (!res.success) {
        message.info('删除失败');
      } else {
        yield put({ type: 'getEmployees' });
      }
    },

    *searchEmployee({ payload: value }, { call, put, select }) {
      const searchKey = yield select(state => state.employee.searchKey);
      const res = yield call(request, `/api/employee/?key=${searchKey}&&value=${value}`, {
        method: 'GET'
      });
      if (!res.success) {
        message.info('查询失败');
      } else {
        yield put({ type: 'setEmployees', payload: res.data })
      }
    },

    *getCompanys(action, { call, put }) {
      const res = yield call(request, `/api/company`, {
        method: 'GET'
      });
      yield put({ type: 'setCompanys', payload: (res.data || []) })
    },
  },

  reducers: {
    initState(state, action) {
      return {
        searchKey: "name",
        employees: [],
        formVisible: false,
        currentEmployee: null,
        formModify: false,
        companys: [],
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

    showUpdateForm(state, { payload: currentEmployee }) {
      return { ...state, formVisible: true, currentEmployee, formModify: true }
    },

    hideEmployeeForm(state, action) {
      return { ...state, formVisible: false, currentEmployee: null, formModify: false }
    },

    setCompanys(state, { payload: companys }) {
      return { ...state, companys }
    },

    setSearchKey(state, { payload: searchKey }) {
      return { ...state, searchKey }
    }

  }
}
