import actionTypes from "../constants/actionTypes";

const initialState = {
  balance: 0,
  details: []
};

export default function sideMenu(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_BALANCE_SUCCESS:
      return {
        ...state,
        balance: payload
      };
    case actionTypes.GET_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        details: payload
      };
    default:
  }
  return state;
}
