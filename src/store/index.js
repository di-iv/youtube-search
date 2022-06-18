import { createStore } from 'vuex';
import auth from './auth';
import favourites from './favourites';
import search from './search';

export default createStore({

  modules: {
    auth,
    search,
    favourites,
  },
});
