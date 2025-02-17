/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: { overlay: false },
    host: 'stomtest.nsmu.ru',
    port: 5173,
    allowedHosts: ['stomtest.nsmu.ru'],
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://stomtest.nsmu.ru:5000',
        changeOrigin: true,
        secure: false
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
});
