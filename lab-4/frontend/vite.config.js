import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    // Gọi /api/... từ FE sẽ được chuyển sang Express (cổng 3000)
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
