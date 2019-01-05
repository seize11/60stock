import actionTypes from "../constants/actionTypes";

const initialState = {
  selectIds: [],
  totalList: [],
  lottery_info: {},
  unfinishedDetail: []
};

export default function selectIds2(state = initialState, action = {}) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    //======CHANGE_SELECT_POPS
    case actionTypes.CHANGE_SELECT_POPS:
      return { ...state, selectIds: payload };

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
