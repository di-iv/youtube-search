import { authApi } from '@/services/api';
import LocalStorage from '@/entities/LocalStorage';

export default class User {
  static async signIn(email, password) {
    const res = await authApi.post('accounts:signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });
    return res.data;
  }

  static async signUp(email, password) {
    const res = await authApi.post('accounts:signUp', {
      email,
      password,
      returnSecureToken: true,
    });
    return res.data;
  }

  static setExpirationTokenDate(expiresIn) {
    const nowDate = new Date();
    const expirationDateMs = nowDate.getTime() + expiresIn * 1000;
    const expirationDate = new Date(expirationDateMs);
    LocalStorage.set('expirationDate', { date: `${expirationDate}`, ms: expirationDateMs });
  }

  static checkToken() {
    const nowDateMs = new Date().getTime();
    const expirationDateMs = LocalStorage.get('expirationDate')?.ms;
    return expirationDateMs > nowDateMs;
  }
}
