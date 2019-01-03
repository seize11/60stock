import actionTypes from "../constants/actionTypes";

const initialState = {
<<<<<<< HEAD
	selectIds: [],
	totalList: [],
	unfinishedDetail: [],
	awardResult: [],
};

export default function playProps(state = initialState, action = {}) {
	const { type, payload } = action;
	console.log(payload);
	switch (type) {
		//======CHANGE_SELECT_POPS
		case actionTypes.CHANGE_SELECT_POPS:
			return { ...state, selectIds: payload };
		//========GET_TOTAL_LIST_REQUEST
		case actionTypes.GET_TOTAL_LIST_REQUEST:
			return { ...state };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_TOTAL_LIST_SUCCESS:
			console.log(payload);
			return { ...state, totalList: payload };
		// loadingState: LOADING_STATE.SUCCESS
		//========GET_TOTAL_LIST_REQUEST
		case actionTypes.GET_UNFINISHED_DETAIL_REQUEST:
			return { ...state };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_UNFINISHED_DETAIL_SUCCESS:
			console.log(action);
			return { ...state, unfinishedDetail: payload };
		// loadingState: LOADING_STATE.SUCCESS

		case actionTypes.GET_AWARD_RESULT_REQUEST:
			return { ...state };
		// loadingState: LOADING_STATE.BEGIN
		case actionTypes.GET_AWARD_RESULT_SUCCESS:
			console.log(action);
			return { ...state, awardResult: payload };

		case actionTypes.DELETE_UNFINISHED_DETAIL_REQUEST:
			return { ...state };

		case actionTypes.DELETE_UNFINISHED_DETAIL_SUCCESS:
			console.log(action);
			return { ...state, deleteResult: payload };
		default:
	}
	return state;
=======
  selectIds: [],
  totalList: [],
  lottery_info: {},
  unfinishedDetail: []
};

export default function playProps(state = initialState, action = {}) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    //======CHANGE_SELECT_POPS
    case actionTypes.CHANGE_SELECT_POPS:
      return { ...state, selectIds: payload };
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
      console.log(payload);
      return { ...state, lottery_info: payload };
    case actionTypes.GO_BET_REQUEST:
      return { ...state };
    // loadingState: LOADING_STATE.BEGIN
    case actionTypes.GO_BET_SUCCESS:
      console.log(payload);
      return { ...state, lottery_info: payload };
    // loadingState: LOADING_STATE.SUCCESS
    //========GET_TOTAL_LIST_REQUEST
    case actionTypes.GET_UNFINISHED_DETAIL_REQUEST:
      return { ...state };
    // loadingState: LOADING_STATE.BEGIN
    case actionTypes.GET_UNFINISHED_DETAIL_SUCCESS:
      return { ...state, unfinishedDetail: payload };
    // loadingState: LOADING_STATE.SUCCESS
    default:
  }
  return state;
>>>>>>> df4fec1e92582cf0653a4ab1d93a51f0d0ca6e1c
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
