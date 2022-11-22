import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require("path");
export default defineConfig(() => ({
  server: {
    port: 8081,
  },
  plugins: [vue()]
}));
