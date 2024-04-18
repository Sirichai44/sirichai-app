import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const devProxy = 'http://127.0.0.1:8080';
const prodProxy = 'https://sirichai-app.onrender.com:8080';
const isProduction = process.env.NODE_ENV === 'production';
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '^/api': {
        target: isProduction ? prodProxy : devProxy
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
