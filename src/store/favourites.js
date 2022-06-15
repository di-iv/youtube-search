import Favourites from '@/services/Favourites';

export default {
  namespaced: true,
  state: {
    favorites: Favourites.getFromStorage() ?? [],
  },
  getters: {
    getFavouriteById: (state) => (id) => state.favorites[id],
  },
  mutations: {
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
};
