import LocalStorage from '@/services/LocalStorage';
import Search from '@/services/Search';
import { createStore } from 'vuex';

export default createStore({
  state: {
    request: '',
    results: null,
    favorites: LocalStorage.get('favourites') ?? [],
  },
  getters: {
  },
  mutations: {
    search(state, { request, results }) {
      state.request = request;
      state.results = results;
    },
    addFavourite(state, { request, name }) {
      state.favorites.push({ request, name });
      LocalStorage.set('favourites', state.favorites);
    },
    editFavourite(state, { id, request, name }) {
      state.favorites[id] = { request, name };
      LocalStorage.set('favourites', state.favorites);
    },
    deleteFavourite(state, id) {
      state.favorites.splice(id, 1);
      LocalStorage.set('favourites', state.favorites);
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
