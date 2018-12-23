import actionTypes from '../constants/actionTypes';
import { CALL_API } from '../constants/symbols';
import { AGENT_INFO, AGENT_LIST, AGENT_ITEM_EDIT } from '../constants/api';

export function getAgentInfo() {
  return {
    [CALL_API]: {
      url: AGENT_INFO,
      method: 'post',
      types: [
        actionTypes.GET_AGENT_INFO_REQUEST,
        actionTypes.GET_AGENT_INFO_SUCCESS,
        actionTypes.GET_AGENT_INFO_FAILURE,
      ],
    },
  };
}

export function getAgentList({ account, page, limit }, success, error) {
  return {
    [CALL_API]: {
      url: AGENT_LIST,
      method: 'post',
      data: {
        account, page, limit,
      },
      success,
      error,
    },
  };
}

export function setAgentItem({ betMaxAmount, settlementPoint, uid }, success, error) {
  return {
    [CALL_API]: {
      url: AGENT_ITEM_EDIT,
      method: 'post',
      data: {
        betMaxAmount, settlementPoint, uid,
      },
      success,
      error,
    },
  };
}
