import fetch from "isomorphic-fetch";
import { Toast } from "antd-mobile";
import { getPrefix, formatUrlWithParams } from "../utils/url";
import { decrypt, encrypt } from "../utils/info";
import HistoryUtils from "../utils/history";
import { CALL_API } from "../constants/symbols";
import actionTypes from "../constants/actionTypes";

const NEED_DECRYPT_CODE = 1024;
const NEED_AESKEY_KEY_CODE = -1003;
const MISSING_AESKEY_KEY_CODE = -1001;
const NEED_TOKEN_CODE = -1000;
const OTHER_PLACE_LOGIN_CODE = -1004;
const ERROR_CODE = 0;
const EMPTY_CODE = -100;
const SUCCESS_CODE = 1;

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (!callAPI) {
    return next(action);
  }
  const currStore = store.getState();
  let success = () => {};
  let error = () => {};
  const { types, url } = callAPI;
  const method = callAPI.method || "get"; // 请求方法 默认GET
  const params = callAPI.params || {}; // url中拼接的内容
  const headers = callAPI.headers || {}; // 额外的header 项
  const urlPreFix = getPrefix(method); // 根据请求方法拼接前缀
  const endpoint = url.startsWith("http")
    ? url
    : urlPreFix + formatUrlWithParams(url, params);
  let { responseCode } = callAPI;

  if (typeof responseCode === "undefined") {
    responseCode = SUCCESS_CODE;
  }

  const useTypes = Array.isArray(types) && types.length === 3;

  if (typeof url !== "string") {
    throw new Error("Specify a string endpoint URL");
  }

  function actionWith(data) {
    return Object.assign({}, action, data);
  }

  // const csrfToken = state.security.csrf_token;
  const [requestType, successType, failureType] = types || [];

  const headerOptions = Object.assign(
    {},
    {
      accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    },
    headers
  );

  if (currStore.base.aesKey) {
    headerOptions.aeskey = currStore.base.aesKey;
  }

  if (currStore.user.token) {
    headerOptions.token = currStore.user.token;
  }

  const options = {
    headers: headerOptions
    // credentials: 'include',
  };

  if (callAPI.method) {
    options.method = method;
  }

  if (callAPI.headers && typeof callAPI.headers === "object") {
    Object.assign(options.headers, callAPI.headers);
  }

  if (callAPI.data) {
    let jsonData = JSON.stringify(callAPI.data);
    if (!callAPI.noEncrypt) {
      jsonData = encrypt(jsonData, currStore.base.decryptionKey);
    }
    Object.assign(options, {
      body: jsonData
    });
  }

  if (callAPI.success && typeof callAPI.success === "function") {
    success = callAPI.success;
  }

  if (callAPI.error && typeof callAPI.error === "function") {
    error = callAPI.error;
  }

  if (useTypes) {
    next(
      actionWith({
        type: requestType,
        payload: callAPI.data || {}
      })
    );
  }

  function hanndleErr(err) {
    Toast.fail(err.msg, 1.5);
    if (failureType) {
      next(
        actionWith({
          type: failureType,
          payload: err || {}
        })
      );
    }
    if (error) {
      error(err);
    }
  }

  function handleSuccess(res) {
    const { code, data, extra, msg, other } = res;

    if (parseInt(code, 10) === parseInt(responseCode, 10)) {
      if (useTypes) {
        next(
          actionWith({
            type: successType,
            payload: data,
            extraData: extra,
            otherData: other,
            requestParams: callAPI.params,
            requestData: callAPI.data
          })
        );
      }
      if (msg) {
        Toast.info(msg, 1.5);
      }
      success(data, store.dispatch);
    } else if (parseInt(code, 10) === parseInt(NEED_DECRYPT_CODE, 10)) {
      // 解码逻辑
      const decryptData = decrypt(data, currStore.base.decryptionKey);
      handleSuccess(JSON.parse(decryptData));
    } else if (
      parseInt(code, 10) === parseInt(ERROR_CODE, 10) ||
      parseInt(code, 10) === parseInt(EMPTY_CODE, 10)
    ) {
      hanndleErr(res);
    } else if (
      parseInt(code, 10) === parseInt(NEED_TOKEN_CODE, 10) ||
      parseInt(code, 10) === parseInt(NEED_AESKEY_KEY_CODE, 10) ||
      parseInt(code, 10) === parseInt(OTHER_PLACE_LOGIN_CODE, 10) ||
      parseInt(code, 10) === parseInt(MISSING_AESKEY_KEY_CODE, 10)
    ) {
      HistoryUtils.push("/login");
    }
  }

  return fetch(endpoint, options)
    .then(response => {
      let responseData = null;
      try {
        responseData = response.json();
      } catch (e) {
        // throw new JsonParseError(e.message);
      }
      return responseData;
    })
    .then(jsonResult => {
      handleSuccess(jsonResult);
    })
    .catch(err => {
      hanndleErr(err);
    });
};
