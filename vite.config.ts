import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const proxy = 'http://127.0.0.1:8080';
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '^/api': {
        // target: 'http://localhost:8080',
        target: proxy
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
