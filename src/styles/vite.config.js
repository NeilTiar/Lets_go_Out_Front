/* import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: 'localhost', // équivalent de --host localhost
    port: 8080, // on garde ton ancien port
    open: true, // ouvre le navigateur automatiquement
  },
}); */

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: 'localhost',
    port: 8080,
    open: true,

    // 🔥 Fix indispensable pour WSL :
    watch: {
      usePolling: true,
      interval: 100, // 100ms = valeur recommandée
    },
  },
});

