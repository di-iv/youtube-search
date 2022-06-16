import { authApi } from '@/services/api';

export default class Auth {
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
}
