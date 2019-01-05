import actionTypes from "../constants/actionTypes";

const initialState = {
  selectIds: [],
  colorIds: [],
  totalList: [],
  lottery_info: {},
  gobetinfo: {},
  balanceInfo: {},
  unfinishedDetail: [],
  isbet: false
};

export default function playProps(state = initialState, action = {}) {
  const { type, payload } = action;
  console.log(payload);
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
