import LocalStorage from '@/services/LocalStorage';

export default {
  namespaced: true,
  state: {
    userId: LocalStorage.get('userInfo')?.id || '',
    userToken: LocalStorage.get('userInfo')?.token || '',
  },
  mutations: {
    auth(state, data) {
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
};
