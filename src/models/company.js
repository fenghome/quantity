import request from '../utils/request';

export default {
  namespace: 'company',
  state: {
    formVisible: false,
    companys: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/company') {
          dispatch({
            type: 'setDefaultState'
          })
        }
      });
    },
  },
  effects: {

    *setDefaultState(action, { call, put }) {
      yield put({ type: 'hideForm' });
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
      })
    }
  },
  reducers: {
    showForm(state, action) {
      return { ...state, formVisible: true }
    },
    hideForm(state, action) {
      return { ...state, formVisible: false }
    },
    setCompanys(state, { payload: companys }) {
      return { ...state, companys }
    }
  }
}
