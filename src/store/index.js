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
    getFavouriteById: (state) => (id) => state.favorites[id],
  },
  mutations: {
    search(state, { request, results }) {
      state.request = request;
      state.results = results;
    },
    addFavourite(state, {
      request, name, order = 'null', resultsCount = 12,
    }) {
      state.favorites.push({
        request, name, order, resultsCount,
      });
      Favourites.addToStorage(state.favorites);
    },
    editFavourite(state, {
      id, request, name, order, resultsCount,
    }) {
      state.favorites[id] = {
        request, name, order, resultsCount,
      };
      Favourites.addToStorage(state.favorites);
    },
    removeFavourite(state, id) {
      state.favorites.splice(id, 1);
      Favourites.addToStorage(state.favorites);
    },
  },
  actions: {
    async search({ commit }, { request, order, resultsCount }) {
      const results = await Search.searchRequest(request, order, resultsCount);
      commit('search', { request, results });
    },
  },
  modules: {
  },
});
