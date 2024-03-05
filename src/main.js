// src/main.js est l'instance de l'application Vue.

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../src/styles/resonsive-desktop.css';
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import store from './store/store';


createApp(App).use(VueAwesomePaginate)
.use(router)
.use(store)
.mount('#app')

