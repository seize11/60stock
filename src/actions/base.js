import actionTypes from '../constants/actionTypes';
import { CALL_API } from '../constants/symbols';
import { BASE_PUBLIC, BASE_AES_KEY } from '../constants/api';

export function getPublicKey(success, error) {
  return {
    [CALL_API]: {
      url: BASE_PUBLIC,
      noEncrypt: true,
      types: [
        actionTypes.GET_PUBLIC_KEY_REQUEST,
        actionTypes.GET_PUBLIC_KEY_SUCCESS,
        actionTypes.GET_PUBLIC_KEY_FAILURE,
      ],
      success,
      error,
    },
  };
}

export function getAesKey({ key, aesKey } = {}, success, error) {
  return {
    [CALL_API]: {
      url: BASE_AES_KEY,
      noEncrypt: true,
      params: {
        key,
        aesKey,
      },
      types: [
        actionTypes.GET_AES_KEY_REQUEST,
        actionTypes.GET_AES_KEY_SUCCESS,
        actionTypes.GET_AES_KEY_FAILURE,
      ],
      success,
      error,
    },
  };
}
