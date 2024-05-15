// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainReviews from '../views/Main-Reviews.vue';
import Home from '../views/Home-page.vue'
import SignupPageVue from '@/views/Signup-page.vue';
import LoginPageVue from '@/views/Login-page.vue';
import ReviewDetailsComponent from '@/views/Review-Details.vue';
import CreateReview from '@/views/Create-review.vue';

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

{
  path: '/review-details',
  name: 'Review-details',
  component: ReviewDetailsComponent,
  props: true // Indique que les paramètres seront transmis comme props au composant
},

  {
    path: '/create-review',
    name: 'Create-review',
    component: CreateReview,
  },
  // Ajoutez d'autres routes ici
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
