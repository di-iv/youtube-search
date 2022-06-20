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
      idx, request, name, order, resultsCount, userId,
    }) {
      const indexInStorage = Favourites.findIndexByRequestAndUserId(
        state.favourites[idx].request,
        userId,
      );
      state.favourites[idx] = {
        request, name, order, resultsCount, userId,
      };
      Favourites.update(indexInStorage, {
        request, name, order, resultsCount, userId,
      });
    },
    removeFavourite(state, { idx, userId }) {
      const indexInStorage = Favourites.findIndexByRequestAndUserId(
        state.favourites[idx].request,
        userId,
      );
      state.favourites.splice(idx, 1);
      Favourites.remove(indexInStorage);
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
