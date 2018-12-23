import actionTypes from '../constants/actionTypes';
import { LOADING_STATE } from '../constants/symbols';
import { getRandomStr } from '../utils/string';
import { decrypt } from '../utils/info';
import StorageUtils from '../utils/storage';

const initialState = {
  name: StorageUtils.getSessionStorage('name') || '',
  token: StorageUtils.getSessionStorage('token') || null,
  rechargeCondition: null,
  activeConditionType: null,
};

export default function sideMenu(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      StorageUtils.setSessionStorage('token', payload.token);
      StorageUtils.setSessionStorage('name', payload.account);
      return {
        ...state,
        name: payload.account,
        token: payload.token,
      };
    case actionTypes.CHANGE_CONDITION_TYPE:
      return {
        ...state,
        activeConditionType: payload,
      };
    case actionTypes.GET_RECHARGE_CONDITION_SUCCESS:
      return {
        ...state,
        rechargeCondition: payload,
        activeConditionType: payload[0].type,
      };
    default:
  }
  return state;
}
