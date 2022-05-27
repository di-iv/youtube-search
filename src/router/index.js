import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
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
