import Favourites from '@/services/Favourites';

export default {
  namespaced: true,
  state: {
    favourites: [],
  },
  getters: {
    getFavouriteById: (state) => (id) => state.favourites[id],
  },
  mutations: {
    addFavourite(state, {
      userId, request, name, order = 'null', resultsCount = 12,
    }) {
      state.favourites.push({
        request, name, order, resultsCount, userId,
      });
      Favourites.addToStorage({
        request, name, order, resultsCount, userId,
      });
    },
    editFavourite(state, {
      id, request, name, order, resultsCount,
    }) {
      state.favourites[id] = {
        request, name, order, resultsCount,
      };
      Favourites.addToStorage(state.favourites);
    },
    removeFavourite(state, id) {
      state.favourites.splice(id, 1);
      Favourites.addToStorage(state.favourites);
    },
    setFavourites(state, data) {
      state.favourites = data;
    },
  },
  actions: {
    getFavourites({ rootState, commit }) {
      const favourites = Favourites.getFromStorageByUserId(rootState.user.id) ?? [];
      commit('setFavourites', favourites);
    },
  },
};
