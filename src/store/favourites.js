import Favourites from '@/services/Favourites';

export default {
  namespaced: true,
  state: {
    favourites: [],
  },
  getters: {
    getFavouriteByIdx: (state) => (idx) => state.favourites[idx],
  },
  mutations: {
    addFavourite(state, {
      userId, request, name, order = 'null', resultsCount = 12,
    }) {
      state.favourites.push({
        request, name, order, resultsCount, userId,
      });
      Favourites.save({
        request, name, order, resultsCount, userId,
      });
    },
    editFavourite(state, {
      id, request, name, order, resultsCount,
    }) {
      state.favourites[id] = {
        request, name, order, resultsCount,
      };
      Favourites.update(state.favourites);
    },
    removeFavourite(state, id) {
      state.favourites.splice(id, 1);
      Favourites.update(state.favourites);
    },
    setFavourites(state, data) {
      state.favourites = data;
    },
  },
  actions: {
    getFavourites({ rootState, commit }) {
      const favourites = Favourites.getByUserId(rootState.user.id) ?? [];
      commit('setFavourites', favourites);
    },
  },
};
