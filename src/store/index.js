import Search from '@/services/Search';
import { createStore } from 'vuex';

export default createStore({
  state: {
    request: '',
    results: null,
  },
  getters: {
  },
  mutations: {
    search(state, { request, results }) {
      state.request = request;
      state.results = results;
    },
  },
  actions: {
    async search({ commit }, { request, resultsCount }) {
      const results = await Search.searchRequest(request, resultsCount);
      commit('search', { request, results });
    },
  },
  modules: {
  },
});
