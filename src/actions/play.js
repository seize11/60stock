import actionTypes from '../constants/actionTypes';
import { CALL_API } from '../constants/symbols';
import { ACCOUNT_BALANCE, ACCOUNT_DETAILS } from '../constants/api';

export function getAccountBalance(success, error) {
  return {
    [CALL_API]: {
      url: ACCOUNT_BALANCE,
      method: 'post',
      params: {
        type: 1,
      },
      types: [
        actionTypes.GET_BALANCE_REQUEST,
        actionTypes.GET_BALANCE_SUCCESS,
        actionTypes.GET_BALANCE_FAILURE,
      ],
      success,
      error,
    },
  };
}

export function getAccountDetails(success, error) {
  return {
    [CALL_API]: {
      url: ACCOUNT_DETAILS,
      method: 'post',
      types: [
        actionTypes.GET_ACCOUNT_DETAILS_REQUEST,
        actionTypes.GET_ACCOUNT_DETAILS_SUCCESS,
        actionTypes.GET_ACCOUNT_DETAILS_FAILURE,
      ],
      success,
      error,
    },
  };
}
