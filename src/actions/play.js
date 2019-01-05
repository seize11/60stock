import actionTypes from '../constants/actionTypes';
import { CALL_API } from '../constants/symbols';
import {
	ACCOUNT_BALANCE,
	ACCOUNT_DETAILS,
	GET_TOTAL_LIST,
	GET_UNFINISHED_DETAIL,
	UNFINISHED_DETAIL,
	GET_FINISHED_DETAIL,
	GET_AWARD_RESULT,
	DELETE_UNFINISHED_DETAIL,
	GET_LOTTERY_INFO,
	GET_BALANCE_INFO,
	GO_BET,
} from '../constants/api';

export function getToatalList(success, error) {
	return {
		[CALL_API]: {
			url: GET_TOTAL_LIST,
			method: 'post',
			types: [
				actionTypes.GET_TOTAL_LIST_REQUEST,
				actionTypes.GET_TOTAL_LIST_SUCCESS,
				actionTypes.GET_TOTAL_LIST_FAILURE,
			],
			success,
			error,
		},
	};
}
export function get_lottery_info(success, error) {
	return {
		[CALL_API]: {
			url: GET_LOTTERY_INFO,
			method: 'post',
			types: [
				actionTypes.GET_LOTTERY_INFO_REQUEST,
				actionTypes.GET_LOTTERY_INFO_SUCCESS,
				actionTypes.GET_LOTTERY_INFO_FAILURE,
			],
			success,
			error,
		},
	};
}
export function get_Balance(success, error) {
	return {
		[CALL_API]: {
			url: GET_BALANCE_INFO,
			method: 'post',
			types: [
				actionTypes.GET_BALANCE_INFO_REQUEST,
				actionTypes.GET_BALANCE_INFO_SUCCESS,
				actionTypes.GET_BALANCE_INFO_FAILURE,
			],
			success,
			error,
		},
	};
}
export function gobet(data, success, error) {
	return {
		[CALL_API]: {
			url: GO_BET,
			method: 'post',
			data,
			types: [actionTypes.GO_BET_REQUEST, actionTypes.GO_BET_SUCCESS, actionTypes.GO_BET_FAILURE],
			success,
			error,
		},
	};
}
export function changeSelectPopsAction(selectIds) {
	return { type: actionTypes.CHANGE_SELECT_POPS, payload: selectIds };
}
export function changeColorIdsAction(colorIds) {
	return { type: actionTypes.CHANGE_COLORIDS_POPS, payload: colorIds };
}
export function changeLotteryInfo(data) {
	return { type: actionTypes.CHANGE_LOTTERY_INFO, payload: data };
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

export function getUnfinishedDetail(success, error) {
	return {
		[CALL_API]: {
			url: GET_UNFINISHED_DETAIL,
			method: 'post',
			types: [
				actionTypes.GET_UNFINISHED_DETAIL_REQUEST,
				actionTypes.GET_UNFINISHED_DETAIL_SUCCESS,
				actionTypes.GET_UNFINISHED_DETAIL_FAILURE,
			],
			success,
			error,
		},
	};
}

export function getFinishedDetail(success, error) {
	return {
		[CALL_API]: {
			url: GET_FINISHED_DETAIL,
			method: 'post',
			types: [
				actionTypes.GET_FINISHED_DETAIL_REQUEST,
				actionTypes.GET_FINISHED_DETAIL_SUCCESS,
				actionTypes.GET_FINISHED_DETAIL_FAILURE,
			],
			success,
			error,
		},
	};
}

export function getAwardResult(data, success, error) {
	return {
		[CALL_API]: {
			url: GET_AWARD_RESULT,
			method: 'post',
			data,
			types: [
				actionTypes.GET_AWARD_RESULT_REQUEST,
				actionTypes.GET_AWARD_RESULT_SUCCESS,
				actionTypes.GET_AWARD_RESULT_FAILURE,
			],
			success,
			error,
		},
	};
}

export function deleteUnfinishedResult(success, error) {
	return {
		[CALL_API]: {
			url: DELETE_UNFINISHED_DETAIL,
			method: 'post',
			types: [
				actionTypes.DELETE_UNFINISHED_DETAIL_REQUEST,
				actionTypes.DELETE_UNFINISHED_DETAIL_SUCCESS,
				actionTypes.DELETE_UNFINISHED_DETAIL_FAILURE,
			],
			success,
			error,
		},
	};
}
