export default {
  // ======================================================
  // Base action types
  // ======================================================
  CHANGE_COLLAPSED: Symbol("CHANGE_COLLAPSED"),
  CHANGE_OPEN_KEYS: Symbol("CHANGE_OPEN_KEYS"),
  CHANGE_ROUTE: "@@router/LOCATION_CHANGE",

  GET_PUBLIC_KEY_REQUEST: Symbol("GET_PUBLIC_KEY_REQUEST"),
  GET_PUBLIC_KEY_SUCCESS: Symbol("GET_PUBLIC_KEY_SUCCESS"),
  GET_PUBLIC_KEY_FAILURE: Symbol("GET_PUBLIC_KEY_FAILURE"),

  GET_AES_KEY_REQUEST: Symbol("GET_AES_KEY_REQUEST"),
  GET_AES_KEY_SUCCESS: Symbol("GET_AES_KEY_SUCCESS"),
  GET_AES_KEY_FAILURE: Symbol("GET_AES_KEY_FAILURE"),

  // ======================================================
  // USER action types
  // ======================================================
  LOG_OUT: Symbol("LOG_OUT"),
  CHANGE_CONDITION_TYPE: Symbol("CHANGE_CONDITION_TYPE"),

  LOGIN_REQUEST: Symbol("LOGIN_REQUEST"),
  LOGIN_SUCCESS: Symbol("LOGIN_SUCCESS"),
  LOGIN_FAILURE: Symbol("LOGIN_FAILURE"),

  GET_RECHARGE_CONDITION_REQUEST: Symbol("GET_RECHARGE_CONDITION_REQUEST"),
  GET_RECHARGE_CONDITION_SUCCESS: Symbol("GET_RECHARGE_CONDITION_SUCCESS"),
  GET_RECHARGE_CONDITION_FAILURE: Symbol("GET_RECHARGE_CONDITION_FAILURE"),

  // ======================================================
  // ACCOUNT action types
  // ======================================================

  GET_BALANCE_REQUEST: Symbol("GET_BALANCE_REQUEST"),
  GET_BALANCE_SUCCESS: Symbol("GET_BALANCE_SUCCESS"),
  GET_BALANCE_FAILURE: Symbol("GET_BALANCE_FAILURE"),

  GET_ACCOUNT_DETAILS_REQUEST: Symbol("GET_ACCOUNT_DETAILS_REQUEST"),
  GET_ACCOUNT_DETAILS_SUCCESS: Symbol("GET_ACCOUNT_DETAILS_SUCCESS"),
  GET_ACCOUNT_DETAILS_FAILURE: Symbol("GET_ACCOUNT_DETAILS_FAILURE"),

  // ======================================================
  // TABLE action types
  // ======================================================
  UPDATE_TABLE: Symbol("UPDATE_TABLE"),

  GET_TABLE_REQUEST: Symbol("GET_TABLE_REQUEST"),
  GET_TABLE_SUCCESS: Symbol("GET_TABLE_SUCCESS"),
  GET_TABLE_FAILURE: Symbol("GET_TABLE_FAILURE"),

  // ======================================================
  // AGENT action types
  // ======================================================

  GET_AGENT_INFO_REQUEST: Symbol("GET_AGENT_INFO_REQUEST"),
  GET_AGENT_INFO_SUCCESS: Symbol("GET_AGENT_INFO_SUCCESS"),
  GET_AGENT_INFO_FAILURE: Symbol("GET_AGENT_INFO_FAILURE"),

  //===========play================
  CHANGE_SELECT_POPS: Symbol("CHANGE_SELECT_POPS"),

  GET_TOTAL_LIST_REQUEST: Symbol("GET_TOTAL_LIST_REQUEST"),
  GET_TOTAL_LIST_SUCCESS: Symbol("GET_TOTAL_LIST_SUCCESS"),
  GET_TOTAL_LIST_FAILURE: Symbol("GET_TOTAL_LIST_FAILURE"),

  GET_LOTTERY_INFO_REQUEST: Symbol("GET_LOTTERY_INFO_REQUEST"),
  GET_LOTTERY_INFO_SUCCESS: Symbol("GET_LOTTERY_INFO_SUCCESS"),
  GET_LOTTERY_INFO_FAILURE: Symbol("GET_LOTTERY_INFO_FAILURE"),

  GO_BET_REQUEST: Symbol("GO_BET_REQUEST"),
  GO_BET_SUCCESS: Symbol("GO_BET_SUCCESS"),
  GO_BET_FAILURE: Symbol("GO_BET_FAILURE"),

  // unfinishedDetail

  GET_UNFINISHED_DETAIL_REQUEST: Symbol("GET_UNFINISHED_DETAIL_REQUEST"),
  GET_UNFINISHED_DETAIL_SUCCESS: Symbol("GET_UNFINISHED_DETAIL_SUCCESS"),
  GET_UNFINISHED_DETAIL_FAILURE: Symbol("GET_UNFINISHED_DETAIL_FAILURE")
};
