import { createStore } from 'vuex';
import favourites from './favourites';
import search from './search';

export default createStore({

  modules: {
    search,
    favourites,
  },
});
