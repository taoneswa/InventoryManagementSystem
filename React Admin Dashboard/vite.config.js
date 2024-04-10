import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy rules
      // Example: Proxy all requests starting with /api to your backend
      '/api': {
        target: 'http://127.0.0.1:8000', // The target server for your API requests
        changeOrigin: true, // Needed for virtual hosted sites, tells the server to set the host header to the target
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally remove /api prefix from the request path
      },
      // If you want to proxy all requests (not just those starting with /api), you can use a catch-all pattern
      // '^/': {
      //   target: 'http://127.0.0.1:8000',
      //   changeOrigin: true,
      // },
    },
  },
});