import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/admin', name: 'Admin', component: Admin }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});
