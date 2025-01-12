
/// <reference types="vitest" /> 

import { defineConfig } from "vite"; 
import vue from "@vitejs/plugin-vue"; 
import vueJsx from "@vitejs/plugin-vue-jsx"; 
import { resolve } from "path";

// 配置对象
export default defineConfig({
  plugins: [vue(), vueJsx()],
  define:{
    PROD: JSON.stringify(false),
    DEV: JSON.stringify(false),
    TEST: JSON.stringify(true),
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/true/coverage/**",
      "**/coverage/**",
    ],
    setupFiles: [resolve(__dirname, "./vitest.setup.ts")],
  },
});
