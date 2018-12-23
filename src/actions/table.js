import actionTypes from '../constants/actionTypes';
import { CALL_API } from '../constants/symbols';
import { BETTING, CHIP, GET_TABLE_CHIP } from '../constants/api';

export function getTableInitData({ fastType, gameType, tableId }, success, error) {
  const data = {
    fastType,
    gameType,
  };
  if (tableId) {
    data.tableId = tableId;
  }
  return {
    [CALL_API]: {
      url: BETTING,
      method: 'post',
      data,
      types: [
        actionTypes.GET_TABLE_REQUEST,
        actionTypes.GET_TABLE_SUCCESS,
        actionTypes.GET_TABLE_FAILURE,
      ],
      success,
      error,
    },
  };
}

export function updateTableData({
  fastType, gameType, data,
}) {
  return {
    type: actionTypes.UPDATE_TABLE,
    payload: {
      key: `${fastType}_${gameType}`,
      data,
    },
  };
}

export function doChip({
  details, gameType, tableId,
}, success, error) {
  return {
    [CALL_API]: {
      url: CHIP,
      method: 'post',
      data: {
        details, gameType, tableId,
      },
      success,
      error,
    },
  };
}

export function getTableChiped({
  tableId,
}, success, error) {
  return {
    [CALL_API]: {
      url: `${GET_TABLE_CHIP}/${tableId}`,
      method: 'post',
      success,
      error,
    },
  };
}
