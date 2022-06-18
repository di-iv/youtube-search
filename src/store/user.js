import User from '@/services/User';
import LocalStorage from '@/services/LocalStorage';

export default {
  namespaced: true,
  state: {
    id: LocalStorage.get('userInfo')?.id || '',
    userToken: LocalStorage.get('userInfo')?.token || '',
  },
  mutations: {
    setUser(state, data) {
      state.id = data.localId;
      state.userToken = data.idToken;
      LocalStorage.set('userInfo', { id: state.id, token: state.userToken });
      User.setExpirationTokenDate(data.expiresIn);
    },
    logout(state) {
      state.id = '';
      state.userToken = '';
      LocalStorage.remove('userInfo');
      LocalStorage.remove('expirationDate');
    },
  },
  actions: {
    async signIn({ commit }, { email, password }) {
      const res = await User.signIn(email, password);
      commit('setUser', res);
    },
    async signUp({ commit }, { email, password }) {
      const res = await User.signUp(email, password);
      commit('setUser', res);
    },
    checkToken({ commit }) {
      const isTokenNotValid = !User.checkToken();
      if (isTokenNotValid) {
        commit('logout');
      }
    },
  },
};
