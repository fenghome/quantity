import request from '../utils/request';

export default {
  namespace: 'company',
  state: {
    formVisible: false,
    companys: [],
    currentCompany: null
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
      })
    },

    *updateCompany({payload:data},{ call, put }){
      const res = yield call(request,`/api/company`,{
        method:'PUT',
        body:data
      })
    }
  },
  reducers: {

    initState(state,action){
      return {
        formVisible: false,
        companys: [],
        currentCompany: null
      }
    },

    showForm(state, { payload: currentCompany }) {
      return { ...state, formVisible: true, currentCompany }
    },

    hideForm(state, action) {
      return { ...state, formVisible: false }
    },

    setCompanys(state, { payload: companys }) {
      return { ...state, companys }
    }
  }
}
