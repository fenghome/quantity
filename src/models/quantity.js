import request from '../utils/request';
import { message } from 'antd';

export default {
  namespace: 'quantity',
  state: {
    quantitys: [],
    companys: [],
    currQuantityId: '',
    currInCompanyId: '',
    currQuantity: [
      {
        key: 0,
        outCompany: '',
        employeeId: '',
        IDCard: '',
        quantityType: '',
        employees: [],
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

    *addQuantity({ payload: addQuantity }, { put, call }) {
      console.log('addQuantity',addQuantity);
      const res = yield call(request, `/api/quantity`, {
        method: 'POST',
        body: addQuantity
      })
    },

    *getCompanys(action, { put, call }) {
      const res = yield call(request, `/api/company`, {
        meithod: 'GET'
      });
      yield put({ type: 'setCompanys', payload: res.data });
    },

    *updateCurrEQ({ payload: { companyName, index } }, { put, call, select }) {

      const res = yield call(request, `/api/employee/?key=companyName&&value=${companyName}`, {
        method: 'GET'
      });
      const { currQuantity } = yield select(state => state.quantity);
      let currObj = [...currQuantity];
      if (res.success) {
        currObj[index].employees = res.data;
      }
      currObj[index].outCompany = companyName;
      yield put({
        type: 'updateCurrQuantity',
        payload: currObj
      })
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

    setCurrInCompanyId(state, { payload: currInCompanyId }) {
      return { ...state, currInCompanyId }
    },

    updateCurrQuantity(state, { payload: currQuantity }) {
      console.log('currQiamtoty', currQuantity);
      return { ...state, currQuantity }
    },

    setCurrEmployees(state, { payload: currEmployees }) {
      return { ...state, currEmployees }
    }
  }
}
