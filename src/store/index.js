import { createStore } from 'vuex';

export default createStore({
  state: {
    request: '',
    results: null,
  },
  getters: {
  },
  mutations: {
    searchResults(state, { request, results }) {
      state.request = request;
      state.results = results;
    },
  },
  actions: {
    searchResults(context, { request, results }) {
      context.commit('searchResults', { request, results });
    },
  },
  modules: {
  },
});
