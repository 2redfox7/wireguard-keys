import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@/components/pages/AuthPage.vue';
import KeysPage from '@/components/pages/KeysPage.vue';

const routes = [
  {
    path: '/',
    name: 'Authentication',
    component: AuthPage,
  },
  {
    path: '/keys',
    name: 'User Keys',
    component: KeysPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;