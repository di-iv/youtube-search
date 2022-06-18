import { createStore } from 'vuex';
import user from './user';
import favourites from './favourites';
import search from './search';

export default createStore({

  modules: {
    user,
    search,
    favourites,
  },
});
