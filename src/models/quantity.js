import request from '../utils/request';
import { message } from 'antd';

export default {
  namespace: 'quantity',
  state: {
    quantitys: [],
    companys: [],
    currQuantity: [{}],

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/quantity/list') {
          dispatch({
            type: 'reloadState'
          });
        }
      });
    }
  },

  effects: {
    *reloadState(action, { put }) {
      yield put({ type: 'getQuantitys' });
      yield put({ type: 'getCompanys' });
    },

    *getQuantitys(actiion, { put, call }) {
      const res = yield call(request, `/api/quantity`, {
        method: 'GET'
      });
      if (res && res.success) {
        yield put({ type: 'setQuantitys', payload: res.data || [] });
      }
    },

    *getCompanys(action, { put, call }) {
      const res = yield call(request, `/api/company`, {
        meithod: 'GET'
      });
      yield put({ type: 'setCompanys', payload: res.data });
    }
  },

  reducers: {
    setQuantitys(state, { payload: quantitys }) {
      return { ...state, quantitys }
    },

    setCompanys(state, { payload: companys }) {
      return { ...state, companys }
    },

    updateCurrQuantity(state, { payload: currQuantity }) {
      console.log('curr',currQuantity);
      return { ...state, currQuantity }
    }
  }
}
