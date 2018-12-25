import actionTypes from "../constants/actionTypes";

const initialState = {
  selectIds: [],
  totalList: []
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
