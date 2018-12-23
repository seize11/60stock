/* global window */
const CryptoJS = require('crypto-js');
/**
* 解密
* @param  {[type]} word      [需要加密的字符]
* @param  {[type]} decryptKey [解密需要的key]
* @return {[type]}           [description]
*/
export const decrypt = (word, decryptKey) => {
  const key = CryptoJS.enc.Utf8.parse(decryptKey);
  const decryptiton = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decryptiton).toString();
};

/**
 * 加密
 * @param  {[type]} word       [需要加密的字符]
 * @param  {[type]} encryptKey [加密的key]
 * @return {[type]}            [description]
 */
export const encrypt = (word, encryptKey) => {
  const key = CryptoJS.enc.Utf8.parse(encryptKey);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/**
 * 生成base64的加密字符串
 * @param  {[type]} randStr   [随机的16位字符串]
 * @param  {[type]} publicKey [通过/home/public_key 获取的data]
 * @return {[type]}           [description]
 */
export const getBase64Encrypt = (randStr, publicKey) => {
  const JSEncrypt = window.JSEncrypt;
  const jsencrypt = new JSEncrypt();
  jsencrypt.setPublicKey(publicKey);
  return jsencrypt.encrypt(randStr);
};
