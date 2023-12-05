// src/main.js est l'instance de l'application Vue.

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../src/styles/resonsive-desktop.css'

const app = createApp(App);
app.use(router);
app.mount('#app');

