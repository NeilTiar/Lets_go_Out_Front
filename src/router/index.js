// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainReviews from '../views/Main-Reviews.vue';
import Home from '../views/Home-page.vue'

const routes = [
  {
    path: '/main',
    name: 'Main-Reviews',
    component: MainReviews,
  },
  
   {
    path: '/',
    name: 'Home-page',
    component: Home,
  },
  // Ajoutez d'autres routes ici
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
