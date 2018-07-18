import request from '../utils/request';
import { message } from 'antd';

const defalutCurrent = {
  id: "",
  selectCompany: null,
  selectQuantityType: "",
  applyNumber: 0,
  mayNumber: 0
}

export default {
  namespace: 'quantityApply',

  state: {
    quantityApplys: [],
    formVisible: false,
    formModify: false,
    currentQuantityApply: defalutCurrent,
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
      yield put({ type: 'initState' });
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
        yield put({ type: 'getCompanys' });
        yield put({ type: 'getQuantityApplys' });
      }
    },

    *updateQuantityApply({ payload: values }, { put, call }) {
      const res = yield call(request, `/api/quantityapply`, {
        method: 'PUT',
        body: values
      });
      if (!res.success) {
        message.info("更新失败");
      } else {
        yield put({ type: 'hideForm' });
        yield put({ type: 'getCompanys' });
        yield put({ type: 'getQuantityApplys' });
      }
    },

    *deleteQuantityApply({ payload: id }, { put, call }) {
      let res = yield call(request, `/api/quantityapply/${id}`, {
        method: 'DELETE'
      });
      res = JSON.parse(res);
      if (!res.success) {
        message.info('删除失败');
      } else {
        yield put({ type: 'getCompanys' });
        yield put({ type: 'getQuantityApplys' });
      }
    },

    *searchQuantityApply({ payload: value }, { put, call }) {
      const res = yield call(request, `/api/quantityapply/?companyName=${value}`, {
        method: 'GET'
      })
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
        currentQuantityApply: defalutCurrent,
      }
    },

    showAddForm(state, action) {
      return { ...state, formVisible: true, formModify: false, currentQuantityApply: defalutCurrent }
    },

    showUpdateForm(state, { payload: currentQuantityApply }) {
      return { ...state, formVisible: true, formModify: true, currentQuantityApply }
    },

    hideForm(state, action) {
      return { ...state, formVisible: false, formModify: false, currentQuantityApply: defalutCurrent }
    },

    setQuantityApplys(state, { payload: quantityApplys }) {
      return { ...state, quantityApplys }
    },

    setCompanys(state, { payload: companys }) {
      return { ...state, companys }
    },

    updateCurrQuantityApply(state, { payload: currentQuantityApply }) {
      return { ...state, currentQuantityApply }
    }
  }

}
