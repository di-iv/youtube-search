import { authApi } from '@/services/api';
import LocalStorage from '@/entities/LocalStorage';

export default class User {
  /**
   * Check token validation
   * @returns {boolean}
   */
  static isTokenValid() {
    const nowDateMs = new Date().getTime();
    const expirationDateMs = LocalStorage.get('expirationDate');
    return expirationDateMs > nowDateMs;
  }

  /**
   * Set expiration token date
   * @param {number} expiresIn - amount of seconds
   */
  static setExpirationTokenDate(expiresIn) {
    const nowDate = new Date();
    const expirationDateMs = nowDate.getTime() + expiresIn * 1000;
    LocalStorage.set('expirationDate', expirationDateMs);
  }

  /**
   * Api request for sign in
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  static async signIn(email, password) {
    const result = await authApi.post('accounts:signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });
    return result.data;
  }

  /**
   * Api request for sign up
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  static async signUp(email, password) {
    const result = await authApi.post('accounts:signUp', {
      email,
      password,
      returnSecureToken: true,
    });
    return result.data;
  }
}
