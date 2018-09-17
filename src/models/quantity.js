import request from '../utils/request';
import {message} from 'antd';
import {routerRedux} from 'dva/router';
export default {
  namespace : 'quantity',
  state : {
    quantitys: [],
    companys: [],
    currQuantityId: '',
    currInCompanyId: '',
    currInCompanyName: '',
    currInCompanyApplys: null,
    currInCompanyUses: null,
    quantityInfo: {
      success: true,
      message: ''
    },
    currQuantity: [ 
      {
        key: 0,
        outCompany: '',
        employeeId: '',
        employeeName:'',
        isNewEmployee: true,
        IDCard: '',
        quantityType: '',
        employees: []
      }
    ]
  },

  subscriptions : {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname === '/quantity/list') {
          dispatch({type: 'reloadState'});
        }
      });
    }
  },

  effects : {
    *reloadState(action, {put}) {
      yield put({type: 'initState'});
      yield put({type: 'getQuantitys'});
      yield put({type: 'getCompanys'});
    },

    *initEditQuantity({payload:quantityId},{put,call,select}){
      const quantitys = yield select(state=>state.quantity.quantitys);
      const companys = yield select(state=>state.quantity.companys);
      //set currQuantityId
      yield put({
        type:'setCurrQuantityId',
        payload:quantityId
      });
      //get currInCompanyName
      const { inCompanyName:currInCompanyName } = quantitys.find(item=>{
        return item.quantityId == quantityId;
      })

      //get currInCompanyId
      const inCompany = companys.find(item=>{
        return item.companyName == currInCompanyName;
      });
      const currInCompanyId = inCompany._id;
      //get currInCompanyApplys
      const currInCompanyApplys = {
        applyXZ: inCompany.applyXZ,
        applyZF: inCompany.applyZF,
        applyGQ: inCompany.applyGQ,
        applyQE: inCompany.applyQE,
        applyCE: inCompany.applyCE,
        applyZS: inCompany.applyZS,
      }
      //set currInCompany
      yield put({
        type:'setCurrInCompany',
        payload:{
          currInCompanyId,
          currInCompanyName,
          currInCompanyApplys,
        }
      })

      const quantityBody = quantitys.filter(item=>{
        return item.quantityId == quantityId;
      })

      //get currQuantity and set currQuantity
      const currQuantity = quantityBody.map((item,index)=>{
        let resQuantity = {};
        resQuantity.key = index;
        resQuantity.outCompany = item.outCompanyName;
        resQuantity.employeeId = item.employee._id;
        resQuantity.employeeName = item.employee.name;
        resQuantity.isNewEmployee = false;
        resQuantity.IDCard = item.employee.IDCard;
        resQuantity.quantityType = item.quantityType;
        resQuantity.employees = [];
        return resQuantity;
      });
      yield put({
        type:'updateCurrQuantity',
        payload:currQuantity
      });
    },

    *getQuantitys(action, {put, call}) {
      const res = yield call(request, `/api/quantity`, {method: 'GET'});
      if (res && res.success && res.data.length > 0) {
        //set data.rowSpan
        let data = res.data; 
        let temRow = 0;
        if (data.length == 1) {
          data[0].rowSpan = 1;
        } else {
          for (let i = data.length - 1; i >= 0; i--) {
            if (i == 0) {
              if (data[0].quantityId == data[1].quantityId) {
                data[0].rowSpan = temRow + 1;
              } else {
                data[0].rowSpan = 1;
              }
            } else {
              if (data[i].quantityId == data[i - 1].quantityId) {
                data[i].rowSpan = 0;
                temRow++;
              } else {
                data[i].rowSpan = temRow + 1;
                temRow = 0;
              }
            }
          }
        }

        yield put({
          type: 'setQuantitys',
          payload: data || []
        });
      }
    },

    * addQuantity({payload: addQuantity}, {put, call}) {
      const res = yield call(request, `/api/quantity`, {
        method: 'POST',
        body: addQuantity
      });
      if (!res.success) {
        message.info('新增失败');
      }
      yield put({type: 'reloadState'});
      yield put(routerRedux.push('/quantity/list'));
    },

    * deleteQuantity({payload:quantityId},{put,call}){
      yield call(request,`/api/quantity/${quantityId}`,{
        method:'DELETE',
      })
    },

    * getCompanys(action, {put, call}) {
      const res = yield call(request, `/api/company`, {meithod: 'GET'});
      yield put({type: 'setCompanys', payload: res.data});
    },

    * updateCurrEQ({
      payload: {
        companyName,
        index
      }
    }, {put, call, select}) {

      const res = yield call(request, `/api/employee/?key=companyName&&value=${companyName}`, {method: 'GET'});
      const {currQuantity} = yield select(state => state.quantity);
      let currObj = [...currQuantity];
      if (res.success) {
        currObj[index].employees = res.data;
      }
      currObj[index].outCompany = companyName;
      yield put({type: 'updateCurrQuantity', payload: currObj})
    },

    * getCurrEmployees({
      payload: companyName
    }, {put, call}) {
      const res = yield call(request, `/api/employees/?companyName=${companyName}`, {method: 'GET'});
      if (res.success) {
        yield put({
          type: 'setCurrEmployees',
          payload: res.data || []
        })
      }
    }
  },

  reducers : {
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
            employeeName:'',
            isNewEmployee: true,
            IDCard: '',
            quantityType: '',
            employees: []
          }
        ]
      }
    },

    setQuantitys(state, {payload: quantitys}) {
      return {
        ...state,
        quantitys
      }
    },

    setCompanys(state, {payload: companys}) {
      return {
        ...state,
        companys
      }
    },

    setCurrQuantityId(state, {payload: currQuantityId}) {
      return {
        ...state,
        currQuantityId
      }
    },

    setCurrInCompany(state, {payload: currInCompany}) {
      return {
        ...state,
        ...currInCompany
      }
    },

    updateCurrQuantity(state, {payload: currQuantity}) {
      return {
        ...state,
        currQuantity
      }
    },

    setCurrEmployees(state, {payload: currEmployees}) {
      return {
        ...state,
        currEmployees
      }
    },

    updateQuantityInfo(state, {payload: quantityInfo}) {
      return {
        ...state,
        quantityInfo
      }
    },

    updateCurrInCompanyUses(state, {payload: currInCompanyUses}) {
      return {
        ...state,
        currInCompanyUses
      }
    }
  }
}