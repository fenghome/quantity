import request from '../utils/request';
import { message } from 'antd';
export default {
  namespace: 'quantityApply',

  state: {
    quantityApplys: [],
    formVisible: false,
    formModify: false,
    currentQuantityApply: [],
    companys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/quantityapply') {
          dispatch({
            type: 'reloadState'
          })
        }
      });
    }
  },

  effects: {
    *reloadState(action, { put, call }) {
      yield put({ type: 'initSate' });
      yield put({ type: 'getQuantityApplys' });
      yield put({ type: 'getCompanys' });
    },

    *getQuantityApplys(action, { put, call }) {
      const res = yield call(request, `/api/quantityapply`, {
        method: 'GET'
      });
      yield put({
        type: 'setQuantityApplys',
        payload: res.data || []
      });
    },

    *addQuantityApply({ payload: values }, { put, call }) {
      const res = yield call(request, `/api/quantityapply`, {
        method: 'POST',
        body: values
      });
      if (!res.success) {
        message.info('新增用编申请失败');
      } else {
        yield put({ type: 'hideForm' });
        yield put({ type: 'getQuantityApplys' });
      }
    },

    *updateQuantityApply({payload:values},{put,call}){
      const res = yield call(request,`/api/quantityapply`,{
        method:'PUT',
        body:values
      });

    },

    *getCompanys(action, { put, call }) {
      const res = yield call(request, `/api/company`, {
        method: 'GET'
      });
      yield put({
        type: 'setCompanys',
        payload: res.data || []
      })
    }
  },

  reducers: {
    initState(state, action) {
      return {
        quantityApplys: [],
        formVisible: false,
        formModify: false,
        companys: [],
        currentQuantityApply: null,
      }
    },

    showAddForm(state, action) {
      return { ...state, formVisible: true, formModify: false, currentQuantityApply: null }
    },

    showUpdateForm(state, { payload: currentQuantityApply }) {
      console.log(currentQuantityApply);
      return { ...state, formVisible: true, formModify: true, currentQuantityApply }
    },

    hideForm(state, action) {
      return { ...state, formVisible: false, formModify: false, currentQuantityApply: null }
    },

    setQuantityApplys(state, { payload: quantityApplys }) {
      return { ...state, quantityApplys }
    },

    setCompanys(state, { payload: companys }) {
      return { ...state, companys }
    }
  }

}
