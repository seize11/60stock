import actionTypes from '../constants/actionTypes';

const initialState = {
	selectIds: [],
	totalList: [],
	unfinishedDetail: [],
	awardResult: [],
	selectIds: [],
	totalList: [],
	lottery_info: {},
	finishedDetail: [],
	loading: false,
	colorIds: [],
	gobetinfo: {},
	balanceInfo: {},
	isbet: false,
	unfinishedOtherData: {},
	finishedOtherData: {},
};

export default function playProps(state = initialState, action = {}) {
	const { type, payload, otherData } = action;
	console.log(payload, otherData);
	switch (type) {
		//======CHANGE_SELECT_POPS
		case actionTypes.CHANGE_SELECT_POPS:
			return { ...state, selectIds: [...payload] };
		//======CHANGE_SELECT_POPS
		case actionTypes.CHANGE_COLORIDS_POPS:
			return { ...state, colorIds: [...payload] };
		//改变对象指针拷贝
		//========GET_TOTAL_LIST_REQUEST
		case actionTypes.GET_TOTAL_LIST_REQUEST:
			return { ...state };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_TOTAL_LIST_SUCCESS:
			console.log(payload);
			return { ...state, totalList: payload };
		case actionTypes.GET_LOTTERY_INFO_REQUEST:
			return { ...state };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_LOTTERY_INFO_SUCCESS:
			// console.log(payload);
			return { ...state, lottery_info: payload };
		case actionTypes.CHANGE_LOTTERY_INFO:
			return { ...state, lottery_info: { ...payload } };
		case actionTypes.GET_BALANCE_INFO_REQUEST:
			return { ...state };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_BALANCE_INFO_SUCCESS:
			console.log(payload);
			return { ...state, balanceInfo: { ...payload } };
		case actionTypes.GO_BET_REQUEST:
			console.log(payload);
			return { ...state, isbet: false };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_UNFINISHED_DETAIL_REQUEST:
			return { ...state };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_UNFINISHED_DETAIL_SUCCESS:
			console.log(action, otherData);
			return {
				...state,
				unfinishedDetail: payload,
				unfinishedOtherData: otherData || { total: 0, win: 0, betAmount: 0 },
			};
		// loadingState: LOADING_STATE.SUCCESS

		case actionTypes.GET_FINISHED_DETAIL_REQUEST:
			return { ...state };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_FINISHED_DETAIL_SUCCESS:
			return {
				...state,
				finishedDetail: payload,
				finishedOtherData: otherData || { total: 0, win: 0, betAmount: 0 },
			};
		case actionTypes.GET_AWARD_RESULT_REQUEST:
			return { ...state, loading: true };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_AWARD_RESULT_SUCCESS:
			console.log(action);
			return { ...state, awardResult: payload, loading: false };

		case actionTypes.DELETE_UNFINISHED_DETAIL_REQUEST:
			return { ...state };

		case actionTypes.DELETE_UNFINISHED_DETAIL_SUCCESS:
			console.log(action);
			return { ...state, deleteResult: payload };
		case actionTypes.GO_BET_SUCCESS:
			console.log(payload);
			return { ...state, gobetinfo: payload, isbet: true };
		// loadingState: LOADING_STATE.SUCCESS
		//========GET_TOTAL_LIST_REQUEST
		case actionTypes.GET_UNFINISHED_DETAIL_REQUEST:
			return { ...state };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_UNFINISHED_DETAIL_SUCCESS:
			return { ...state, unfinishedDetail: payload };
		// loadingState: LOADING_STATE.SUCCESS
		case actionTypes.UPDATE_FINISHED_DETAIL:
			console.log(payload);

			return { ...state, finishedDetail: payload };
		case actionTypes.UPDATE_UNFINISHED_DETAIL:
			console.log(payload);
			return { ...state, unfinishedDetail: payload };
		default:
	}
	return state;
}

// export default function GetTotalList(state = initialState, action = {}) {
//   const { type, payload } = action;
//   switch (type) {
//     case actionTypes.GET_TOTAL_LIST_REQUEST:
//       return {
//         ...state,
//         loadingState: LOADING_STATE.BEGIN,
//       };
//     case actionTypes.GET_TOTAL_LIST_SUCCESS:
//       return {
//         ...state,
//         referralCode: payload.referralCode,
//         settlementPoint: payload.settlementPoint,
//         loadingState: LOADING_STATE.SUCCESS,
//       };
//     default:
//   }
//   return state;
// }
