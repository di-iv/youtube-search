import YouTube from '@/entities/YouTube';

export default {
  namespaced: true,
  state: {
    request: '',
    results: null,
  },
  mutations: {
    search(state, { request, results }) {
      state.request = request;
      state.results = results;
    },
  },
  actions: {
    async search({ commit }, { request, order, resultsCount }) {
      const results = await YouTube.search(request, order, resultsCount);
      commit('search', { request, results });
    },
  },
};
