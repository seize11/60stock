import actionTypes from '../constants/actionTypes';
import { LOADING_STATE } from '../constants/symbols';

const initialState = {
  referralCode: null,
  settlementPoint: null,
  loadingState: LOADING_STATE.DEFAULT,
};

export default function sideMenu(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_AGENT_INFO_REQUEST:
      return {
        ...state,
        loadingState: LOADING_STATE.BEGIN,
      };
    case actionTypes.GET_AGENT_INFO_SUCCESS:
      return {
        ...state,
        referralCode: payload.referralCode,
        settlementPoint: payload.settlementPoint,
        loadingState: LOADING_STATE.SUCCESS,
      };
    default:
  }
  return state;
}
