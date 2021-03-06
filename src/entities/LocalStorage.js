export default class LocalStorage {
  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static remove(key) {
    return localStorage.removeItem(key);
  }

  static set(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }
}
