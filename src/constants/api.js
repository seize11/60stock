// ======================================================
// base api
// ======================================================

// 获取aeskey_1
export const BASE_PUBLIC = "/home/public_key";

export const BASE_AES_KEY = "/home/aes_key?key={key}&aesKey={aesKey}";

// ======================================================
// user api
// ======================================================

// 登陆
export const LOGIN = "/home/login";
export const LOGOUT = "/user/logout";
export const RECHARGE_APPLY = "/user/recharge/apply";
export const RECHARGE_CODITION = "/user/recharge/condition";
export const WITHDRAW = "/user/withdraw/apply";
export const USER_TRANSFER = "/user/account/transfer";
export const USER_RECORDS = "/user/account/records";
export const USER_BANK_CARD = "/user/bankcard";
export const BANK_VAL = "/user/bankcard/validate";
export const BANK_BIND = "/user/bankcard/bind";
export const CHANGE_PASSWORD = "/user/change/password";

// ======================================================
// account api
// ======================================================

// 余额
export const ACCOUNT_BALANCE = "/user/account/balance/{type}";
export const ACCOUNT_DETAILS = "/user/account/details";

// ======================================================
// agent api
// ======================================================

// 余额
export const AGENT_INFO = "/team/info";
export const AGENT_LIST = "/team/options";
export const AGENT_ITEM_EDIT = "/team/options/edit";

// ======================================================
// table api
// ======================================================

// 获取table首次数据
export const BETTING = "/table/trend";
export const CHIP = "/table/player/bet";
export const TABLE_TCB = "/topic/tcb/trend";
export const TABLE_BACCARAT = "/topic/baccarat/trend";
export const TABLE_BACCARAT_FAST = "/topic/baccarat/trend/fast";
export const TABLE_TCB_FAST = "/topic/tcb/trend/fast";
export const GET_TABLE_CHIP = "/table/player/bet/amount";

//playPage页面交互贡公共参数
export const GET_TOTAL_LIST = "/lottery/menu/1";
export const GET_LOTTERY_INFO = "/lottery/info/1";
export const GO_BET = "/lottery/bet";

// 获取未结详情
<<<<<<< HEAD
export const GET_UNFINISHED_DETAIL = '/lottery/bet/processing';

export const GET_AWARD_RESULT = '/lottery/open/list';
=======
export const GET_UNFINISHED_DETAIL = "/lottery/bet/processing";
>>>>>>> df4fec1e92582cf0653a4ab1d93a51f0d0ca6e1c
