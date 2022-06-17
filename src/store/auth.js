import Auth from '@/services/Auth';
import LocalStorage from '@/services/LocalStorage';

export default {
  namespaced: true,
  state: {
    userId: LocalStorage.get('userInfo')?.id || '',
    userToken: LocalStorage.get('userInfo')?.token || '',
  },
  mutations: {
    setUser(state, data) {
      state.userId = data.localId;
      state.userToken = data.idToken;
      LocalStorage.set('userInfo', { id: state.userId, token: state.userToken });
    },
    logout(state) {
      state.userId = '';
      state.userToken = '';
      LocalStorage.remove('userInfo');
    },
  },
  actions: {
    async signIn({ commit }, { email, password }) {
      const res = await Auth.signIn(email, password);
      commit('setUser', res);
    },
    async signUp({ commit }, { email, password }) {
      const res = await Auth.signUp(email, password);
      commit('setUser', res);
    },
  },
};
