import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path';

export default defineConfig({
  plugins: [vueDevTools(),vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },


  },
server: {
  host: 'localhost',
  port: 8080,
  open: true,
  watch: {
    usePolling: true,
    interval: 100
  }
},
      test: {
    environment: 'jsdom' // ⬅️ essentiel pour les tests de composants Vue
  }
});
