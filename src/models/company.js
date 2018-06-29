import request from '../utils/request';
import { message } from 'antd';

export default {
  namespace: 'company',
  state: {
    companys: [],
    formVisible: false,
    formModify: false,
    currentCompany: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/company') {
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
      yield put({ type: 'getCompanys' });
    },

    *getCompanys(action, { call, put }) {
      const res = yield call(request, `/api/company`, {
        method: 'GET'
      });
      yield put({ type: 'setCompanys', payload: (res.data || []) })
    },

    *saveCompany({ payload: data }, { call, put }) {
      const res = yield call(request, `/api/company`, {
        method: 'POST',
        body: data
      });
      if (!res.success) {
        message.info('新增失败')
      }
      yield put({ type: 'getCompanys' });
      yield put({ type: 'hideForm' });
    },

    *updateCompany({ payload: data }, { call, put }) {
      yield put({ type: 'setCurrentCompany', payload: data });
      const res = yield call(request, `/api/company`, {
        method: 'PUT',
        body: data
      });
      if(!res.success){
        message.info('更新失败');
      }
      yield put({ type: 'getCompanys' });
      yield put({ type: 'hideForm' });
    },

    *deleteCompany({ payload: data }, { call, put }) {
      const res = yield call(request, `/api/company/${data._id}`, {
        method: 'DELETE'
      });
      const resObj = JSON.parse(res);
      if(!resObj.success){
        message.info('删除失败');
      }
      yield put({ type: 'getCompanys' });
    },

    *searchCompany({ payload: value }, { call, put }) {
      const res = yield call(request, `/api/company/${value}`, {
        method: 'GET'
      });
      if (res.success) {
        yield put({ type: 'setCompanys', payload: res.data })
      }
    }
  },

  reducers: {
    initState(state, action) {
      return {
        companys: [],
        formVisible: false,
        formModify: false,
        currentCompany: null
      }
    },

    showAddForm(state, action) {
      return { ...state, formVisible: true, formModify: false, currentCompany: null }
    },

    showUpdateForm(state, { payload: currentCompany }) {
      return { ...state, formVisible: true, formModify: true, currentCompany }
    },

    hideForm(state, action) {
      return { ...state, formVisible: false, formModify: false, currentCompany: null }
    },

    setCurrentCompany(state, { payload: currentCompany }) {
      return { ...state, currentCompany }
    },

    setCompanys(state, { payload: companys }) {
      return { ...state, companys }
    },
  }
}
