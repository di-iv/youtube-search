import Favourites from '@/services/Favourites';
import auth from '@/store/auth';

export default {
  namespaced: true,
  state: {
    favorites: [],
  },
  getters: {
    getFavouriteById: (state) => (id) => state.favorites[id],
  },
  mutations: {
    addFavourite(state, {
      userId, request, name, order = 'null', resultsCount = 12,
    }) {
      state.favorites.push({
        request, name, order, resultsCount, userId,
      });
      Favourites.addToStorage({
        request, name, order, resultsCount, userId,
      });
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
    getFavouriteFromStorage(state) {
      state.favorites = Favourites.getFromStorageByUserId(auth.state.userId) ?? [];
    },
  },
};
