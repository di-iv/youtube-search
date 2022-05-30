import EmptyLayout from '@/layouts/EmptyLayout';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'login',
    meta: {
      layout: EmptyLayout,
    },
    component: () => import('../views/LoginView'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView'),
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/FavoritesView'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
