import actionTypes from "../constants/actionTypes";
import { CALL_API } from "../constants/symbols";
import {
  ACCOUNT_BALANCE,
  ACCOUNT_DETAILS,
  GET_TOTAL_LIST
} from "../constants/api";

export function getToatalList(success, error) {
  return {
    [CALL_API]: {
      url: GET_TOTAL_LIST,
      method: "post",
      types: [
        actionTypes.GET_TOTAL_LIST_REQUEST,
        actionTypes.GET_TOTAL_LIST_SUCCESS,
        actionTypes.GET_TOTAL_LIST_FAILURE
      ],
      success,
      error
    }
  };
}
export function changeSelectPopsAction(selectIds) {
  return { type: actionTypes.CHANGE_SELECT_POPS, payload: selectIds };
}
export function getAccountDetails(success, error) {
  return {
    [CALL_API]: {
      url: ACCOUNT_DETAILS,
      method: "post",
      types: [
        actionTypes.GET_ACCOUNT_DETAILS_REQUEST,
        actionTypes.GET_ACCOUNT_DETAILS_SUCCESS,
        actionTypes.GET_ACCOUNT_DETAILS_FAILURE
      ],
      success,
      error
    }
  };
}
