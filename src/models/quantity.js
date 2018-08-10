import request from '../utils/request';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'quantity',
  state: {
    quantitys: [],
    companys: [],
    currQuantityId: '',
    currInCompanyId: '',
    currInCompanyName: '',
    currInCompanyApplys:null,
    currQuantity: [
      {
        key: 0,
        outCompany: '',
        employeeId: '',
        isNewEmployee: true,
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
      yield put({ type: 'initState' });

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
      const res = yield call(request, `/api/quantity`, {
        method: 'POST',
        body: addQuantity
      });
      if (!res.success) {
        message.info('新增失败');
      }
      yield put({type:'reloadState'});
      yield put(routerRedux.push('/quantity/list'));
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
    initState(state, action) {
      return {
        quantitys: [],
        companys: [],
        currQuantityId: '',
        currInCompanyId: '',
        currInCompanyName: '',
        currQuantity: [
          {
            key: 0,
            outCompany: '',
            employeeId: '',
            isNewEmployee: true,
            IDCard: '',
            quantityType: '',
            employees: [],
          }
        ]
      }
    },

    setQuantitys(state, { payload: quantitys }) {
      return { ...state, quantitys }
    },

    setCompanys(state, { payload: companys }) {
      return { ...state, companys }
    },

    setCurrQuantityId(state, { payload: currQuantityId }) {
      return { ...state, currQuantityId }
    },

    setCurrInCompany(state, { payload: currInCompany }) {
      return { ...state, ...currInCompany }
    },

    updateCurrQuantity(state, { payload: currQuantity }) {
      return { ...state, currQuantity }
    },

    setCurrEmployees(state, { payload: currEmployees }) {
      return { ...state, currEmployees }
    }
  }
}
