import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView'),
    beforeEnter(to, from, next) {
      if (store.state.user.userToken) {
        next('/search');
        return;
      }
      next();
    },
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      layout: MainLayout,
      auth: true,
    },
    component: () => import('../views/SearchView'),
  },
  {
    path: '/favourites',
    name: 'favourites',
    meta: {
      layout: MainLayout,
      auth: true,
    },
    component: () => import('../views/FavouritesView'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (store.state.user.userToken) {
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
});
export default router;
