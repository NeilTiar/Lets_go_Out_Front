// src/main.js est l'instance de l'application Vue.
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../src/styles/responsive-desktop.css';
import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';
import store from './store/store';
import './styles/globals.css';
import { createHead } from '@vueuse/head'  

const app = createApp(App);
const head = createHead()    

// Utilisation des plugins
app.use(VueAwesomePaginate).use(router).use(store);

// Montage de l'application
app.use(head) 
app.mount('#app');
