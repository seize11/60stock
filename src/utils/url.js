import { USE_LOCAL } from "../constants/config";
import { BASE_ROUTE } from "../constants/env";

export function getRoute(path) {
  return BASE_ROUTE + path;
}
export const socketHost = USE_LOCAL
  ? "http://zyy.s3.natapp.cc/ws"
  : "http://wf0101.com/wf/ws";

/* global window document */
/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 参数对象
 * @returns {string} - 拼接成的字符串参数
 */
export function encodeSearchParams(obj) {
  const params = [];

  Object.keys(obj).forEach(key => {
    let value = obj[key];
    if (typeof value === "undefined") {
      value = "";
    }
    params.push([key, encodeURIComponent(value)].join("="));
  });

  return params.join("&");
}

export function getCookie(cname) {
  const name = `${cname}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i += 1) {
    const cookieKeyAndValue = cookies[i].trim();
    if (cookieKeyAndValue.indexOf(name) === 0) {
      return cookieKeyAndValue.substring(name.length, cookieKeyAndValue.length);
    }
  }
  return "";
}

export function getURLParamsObject() {
  const search = window.location.search.substr(1);
  return search.split("&").reduce((result, paramStr) => {
    const nextResult = result;
    if (paramStr) {
      const paramObject = paramStr.split("=");
      nextResult[paramObject[0]] = paramObject[1];
    }
    return nextResult;
  }, {});
}
/**
 * 配置 useMock 以及 环境变量来 决定 api 前缀
 * @param  {[string]} meth [请求的方法]
 * @return {[string]} [返回prefix]
 */
export function getPrefix() {
  const isProd = process.env.API_ENV === "production";
  const prodHost = "http://wf0101.com/wf/api";
  // const statgeHost = 'http://47.106.205.151/wf/api';
  const statgeHost = "http://wf0101.com/wf/api";
  const localHost = "http://zyy.s3.natapp.cc/api";
  const preHost = isProd ? prodHost : statgeHost;
  if (USE_LOCAL) {
    return localHost;
  }
  return preHost;
}

/**
 * 简单的替换url中的参数
 * @param  {[type]} url    [description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function formatUrlWithParams(url, params) {
  const replacer = (str, key) => params[key];
  return url.replace(/{(([A-Za-z0-9]|_)+)}/g, replacer);
}
