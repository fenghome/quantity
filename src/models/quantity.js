import request from '../utils/request';
import { message } from 'antd';

export default {
  namespace: 'quantity',
  state: {
    quantitys: [],
    companys: [],
    currQuantityId: '',
    currQuantity: [
      {
        key: 0,
        outCompany: '东方闪电',
        inCompany: '东南西',
        name: '',
        IDCard: '',
        quantityType: '',
        employees:[],
      }
    ],
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

    *getQuantitys(action, { put, call }) {
      const res = yield call(request, `/api/quantity`, {
        method: 'GET'
      });
      if (res && res.success) {
        yield put({ type: 'setQuantitys', payload: res.data || [] });
      }
    },

    *addQuantity({ payload: currQuantity }, { put, call }) {
      const res = yield call(request, `/api/quantity`, {
        method: 'POST',
        body: currQuantity
      })
    },

    *getCompanys(action, { put, call }) {
      const res = yield call(request, `/api/company`, {
        meithod: 'GET'
      });
      yield put({ type: 'setCompanys', payload: res.data });
    },

    *getCurrEmployees({ payload: companyName }, { put, call }) {
      const res = yield call(request, `/api/employees/?companyName=${companyName}`, {
        method: 'GET'
      });
      if (res.success) {
        yield put({
          type: 'setCurrEmployees',
          payload: res.data || []
        })
      }
    }
  },

  reducers: {
    setQuantitys(state, { payload: quantitys }) {
      return { ...state, quantitys }
    },

    setCompanys(state, { payload: companys }) {
      return { ...state, companys }
    },

    setCurrQuantityId(state, { payload: currQuantityId }) {
      return { ...state, currQuantityId }
    },

    updateCurrQuantity(state, { payload: currQuantity }) {
      console.log('curr', currQuantity);
      return { ...state, currQuantity }
    },

    setCurrEmployees(state, { payload: currEmployees }) {
      return { ...state, currEmployees }
    }
  }
}
