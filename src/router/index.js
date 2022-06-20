import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout';
import store from '@/store';

const isUserAuthorized = store.state.user.token;

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView'),
    beforeEnter(to, from, next) {
      if (isUserAuthorized) {
        next({ name: 'search' });
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
  const isAuthNotRequired = to.matched.every((record) => !record.meta.auth);
  if (isAuthNotRequired) {
    next();
    return;
  }
  if (isUserAuthorized) {
    next();
    return;
  }
  next('/');
});
export default router;
