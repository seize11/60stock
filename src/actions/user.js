import actionTypes from '../constants/actionTypes';
import { CALL_API } from '../constants/symbols';
import {
  LOGIN, RECHARGE_CODITION, RECHARGE_APPLY,
  WITHDRAW, USER_TRANSFER, USER_RECORDS, USER_BANK_CARD,
  LOGOUT, BANK_VAL, BANK_BIND, CHANGE_PASSWORD,
} from '../constants/api';

export function login({ account, password }, success, error) {
  return {
    [CALL_API]: {
      url: LOGIN,
      method: 'post',
      data: {
        account,
        password,
      },
      types: [
        actionTypes.LOGIN_REQUEST,
        actionTypes.LOGIN_SUCCESS,
        actionTypes.LOGIN_FAILURE,
      ],
      success,
      error,
    },
  };
}

export function changeConditionType(type) {
  return {
    type: actionTypes.CHANGE_CONDITION_TYPE,
    payload: type,
  };
}
export function getRechargeCondition(success, error) {
  return {
    [CALL_API]: {
      url: RECHARGE_CODITION,
      method: 'post',
      data: {},
      types: [
        actionTypes.GET_RECHARGE_CONDITION_REQUEST,
        actionTypes.GET_RECHARGE_CONDITION_SUCCESS,
        actionTypes.GET_RECHARGE_CONDITION_FAILURE,
      ],
      success,
      error,
    },
  };
}

export function rechargeApply({ amount, type }, success, error) {
  return {
    [CALL_API]: {
      url: RECHARGE_APPLY,
      method: 'post',
      data: {
        amount,
        type,
      },
      success,
      error,
    },
  };
}

export function getBankCard(success, error) {
  return {
    [CALL_API]: {
      url: USER_BANK_CARD,
      method: 'post',
      success,
      error,
    },
  };
}

export function withdraw({ amount }, success, error) {
  return {
    [CALL_API]: {
      url: WITHDRAW,
      method: 'post',
      data: {
        amount,
      },
      success,
      error,
    },
  };
}

export function transfer({ amount, accountType, operationType }, success, error) {
  return {
    [CALL_API]: {
      url: USER_TRANSFER,
      method: 'post',
      data: {
        amount, accountType, operationType,
      },
      success,
      error,
    },
  };
}

export function chenkBankNo({ cardNo, name }, success, error) {
  return {
    [CALL_API]: {
      url: BANK_VAL,
      method: 'post',
      data: {
        cardNo, name,
      },
      success,
      error,
    },
  };
}

export function getRecords({
  accountType, startTime, endTime, timeType,
  page, limit,
}, success, error) {
  const data = {
    accountType,
    timeType,
    page,
    limit,
  };

  if (startTime) {
    data.startTime = startTime;
    data.endTime = endTime;
  }
  return {
    [CALL_API]: {
      url: USER_RECORDS,
      method: 'post',
      data,
      success,
      error,
    },
  };
}

export function logout(success, error) {
  return {
    [CALL_API]: {
      url: LOGOUT,
      method: 'post',
      success,
      error,
    },
  };
}

export function bindCard({
  bankName, cardNo, mobile, realName,
}, success, error) {
  console.log(bankName, cardNo, mobile, realName);
  return {
    [CALL_API]: {
      url: BANK_BIND,
      method: 'post',
      data: {
        bankName, cardNo, mobile, realName,
      },
      success,
      error,
    },
  };
}

export function changePassword({
  newPassword, oldPassword,
}, success, error) {
  return {
    [CALL_API]: {
      url: CHANGE_PASSWORD,
      method: 'post',
      data: {
        newPassword, oldPassword,
      },
      success,
      error,
    },
  };
}
