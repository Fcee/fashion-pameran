import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-dev-html',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '/index.html') {
            req.url = '/index.dev.html';
          }
          next();
        });
      }
    }
  ],
  base: './',
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: './index.dev.html'
    }
  }
});
