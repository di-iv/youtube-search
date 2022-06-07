import MainLayout from '@/layouts/MainLayout';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView'),
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      layout: MainLayout,
    },
    component: () => import('../views/SearchView'),
  },
  {
    path: '/favorites',
    name: 'favorites',
    meta: {
      layout: MainLayout,
    },
    component: () => import('../views/FavoritesView'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
