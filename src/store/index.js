import Favourites from '@/services/Favourites';
import Search from '@/services/Search';
import { createStore } from 'vuex';

export default createStore({
  state: {
    request: '',
    results: null,
    favorites: Favourites.getFromStorage() ?? [],
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
      Favourites.addToStorage(state.favorites);
    },
    editFavourite(state, { id, request, name }) {
      state.favorites[id] = { request, name };
      Favourites.addToStorage(state.favorites);
    },
    deleteFavourite(state, id) {
      state.favorites.splice(id, 1);
      Favourites.addToStorage(state.favorites);
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
