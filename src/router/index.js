// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainReviews from '../views/Main-Reviews.vue';
import Home from '../views/Home-page.vue'
import SignupPageVue from '@/views/Signup-page.vue';
import LoginPageVue from '@/views/Login-page.vue';

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

    {
    path: '/signup',
    name: 'Signup-page',
    component: SignupPageVue,
  },

     {
    path: '/Login',
    name: 'Login-page',
    component: LoginPageVue,
  },
  // Ajoutez d'autres routes ici
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
