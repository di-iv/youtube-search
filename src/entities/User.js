import { authApi } from '@/services/api';
import LocalStorage from '@/entities/LocalStorage';

export default class User {
  /**
   * Check token validation
   * @returns {boolean}
   */
  static isTokenValid() {
    const nowDateMs = new Date().getTime();
    const expirationDateMs = LocalStorage.get('expirationDate')?.ms;
    return expirationDateMs > nowDateMs;
  }

  /**
   * Set expiration token date
   * @param {number} expiresIn - amount of seconds
   */
  static setExpirationTokenDate(expiresIn) {
    const nowDate = new Date();
    const expirationDateMs = nowDate.getTime() + expiresIn * 1000;
    const expirationDate = new Date(expirationDateMs);
    LocalStorage.set('expirationDate', { date: `${expirationDate}`, ms: expirationDateMs });
  }

  /**
   * Api request for sign in
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  static async signIn(email, password) {
    const res = await authApi.post('accounts:signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });
    return res.data;
  }

  /**
   * Api request for sign up
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  static async signUp(email, password) {
    const res = await authApi.post('accounts:signUp', {
      email,
      password,
      returnSecureToken: true,
    });
    return res.data;
  }
}
