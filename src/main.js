import i18n from '@/plugins/i18n';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.scss';

const app = createApp(App).use(store).use(router);

store.dispatch('user/checkToken');

app.use(i18n);
app.mount('#app');
