import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';


import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export default defineConfig({
  base: './',
  plugins: [vue(), VueSetupExtend(),
  AutoImport(),
  Components()],
  server: {
    host: '0.0.0.0',
    port: 9527,
    open: true,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
