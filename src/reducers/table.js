import actionTypes from '../constants/actionTypes';
import { LOADING_STATE } from '../constants/symbols';
import { getRandomStr } from '../utils/string';
import { decrypt } from '../utils/info';

const initialState = {

};

export default function sideMenu(state = initialState, action = {}) {
  const { type, payload, requestData } = action;
  const { fastType, gameType } = requestData || {};
  const succKey = `${fastType}_${gameType}`;
  switch (type) {
    case actionTypes.GET_TABLE_SUCCESS:
      if (requestData.tableId) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        [succKey]: payload,
      };
    case actionTypes.UPDATE_TABLE:
      return {
        ...state,
        [payload.key]: payload.data,
      };
    default:
  }
  return state;
}
