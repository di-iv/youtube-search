import { authApi } from '@/services/api';

export default class Auth {
  static async signIn(email, password) {
    const res = await authApi.post('', {
      email,
      password,
      returnSecureToken: true,
    });
    return res.data;
  }
}
