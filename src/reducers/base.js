import actionTypes from '../constants/actionTypes';
import { LOADING_STATE } from '../constants/symbols';
import { getRandomStr } from '../utils/string';
import { decrypt } from '../utils/info';
import StorageUtils from '../utils/storage';

const initialState = {
  randomStr: getRandomStr(),
  aesKey: StorageUtils.getSessionStorage('aesKey') || null,
  decryptionKey: StorageUtils.getSessionStorage('decryptionKey') || null,
  wsKey: StorageUtils.getSessionStorage('wsKey') || null,
};

export default function sideMenu(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_PUBLIC_KEY_REQUEST:
      return {
        ...state,
      };
    case actionTypes.GET_AES_KEY_SUCCESS:
      StorageUtils.setSessionStorage('aesKey', payload.key);
      StorageUtils.setSessionStorage('decryptionKey', decrypt(payload.data, state.randomStr));
      StorageUtils.setSessionStorage('wsKey', decrypt(payload.wskey, state.randomStr));
      return {
        ...state,
        aesKey: payload.key,
        decryptionKey: decrypt(payload.data, state.randomStr),
        wsKey: decrypt(payload.wskey, state.randomStr),
      };
    default:
  }
  return state;
}
