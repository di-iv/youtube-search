import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.scss';

const app = createApp(App).use(store).use(router);

store.dispatch('user/checkToken').then(() => {
  app.mount('#app');
});
