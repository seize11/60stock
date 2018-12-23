/* global sessionStorage localStorage */
class Storage {
  getSessionStorage = key => sessionStorage.getItem(key);

  setSessionStorage = (key, val) => sessionStorage.setItem(key, val);

  getLocalStorage = key => localStorage.getItem(key);

  setLocalStorage = (key, val) => localStorage.setItem(key, val);
}
export default new Storage();
