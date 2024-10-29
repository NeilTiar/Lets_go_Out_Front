// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainReviews from '../views/Main-Reviews.vue';
import Home from '../views/Home-page.vue'
import SignupPageVue from '@/views/Signup-page.vue';
import LoginPageVue from '@/views/Login-page.vue';
import ReviewDetailsComponent from '@/views/Review-Details.vue';
import CreateReview from '@/views/Create-review.vue';
import AdminPageVue from '@/views/Admin-page.vue'
import ActivateReviewsPage from '@/views/Activate-Reviews.vue'
import store from '@/store/store';
import FavoritesPage from '@/views/favorites-page.vue';

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
    meta: { requiresAuth: true, requiresAdmin: false } 
    //métadonnées requiresAuth et requiresAdmin aux routes qui nécessitent une authentification ou des privilèges d'administrateur.
  },

  {
   path :'/admin',
   name:'Admin-page',
   component: AdminPageVue,
   meta: { requiresAuth: true, requiresAdmin: true } 
    //métadonnées requiresAuth et requiresAdmin aux routes qui nécessitent une authentification ou des privilèges d'administrateur.
  },

  
  {
   path :'/admin/activate-reviews',
   name:'Activate-Reviews',
   component: ActivateReviewsPage,
   meta: { requiresAuth: true, requiresAdmin: true } 
    //métadonnées requiresAuth et requiresAdmin aux routes qui nécessitent une authentification ou des privilèges d'administrateur.
  },

  {
  
  path : '/favorites',
  name :'FavoritesPage',
  component :FavoritesPage,
  meta: { requiresAuth : true, requiresAdmin: false }

  }

  // Ajoutez d'autres routes ici
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// src/router/index.js
router.beforeEach((to, from, next) => {

  const isAuthAsAdmin = store.getters.isAdmin;
 // test  console.log('isAuthAsAdmin from router by store: ', isAuthAsAdmin);



  // Vérifie si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isAuthAsAdmin) {
      // Utilisateur non authentifié, redirige vers la page de login
      next({ path:'/login' });
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
      // Vérifie si la route nécessite des permissions d'administrateur
      if (isAuthAsAdmin) {
        // Utilisateur authentifié et administrateur, continue la navigation
        next();
      } else {
        // Utilisateur authentifié mais pas administrateur, redirige vers la page d'accueil
        next({ name: 'Home' });
      }
    } else {
      // Utilisateur authentifié mais la route n'exige pas d'être administrateur, continue la navigation
      next();
    }
  } else {
    // Pas besoin d'authentification pour cette route, continue la navigation
    next();
  }
});

export default router;
