/* eslint-disable @typescript-eslint/no-unused-vars */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import Components from "unplugin-vue-components/vite";
import legacyPlugin from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    Components({
      dts: "src/typings/components.d.ts",
      dirs: ["src/components/business", "src/components/common"],
    }),
    legacyPlugin({
      targets: ["last 2 versions", "safari >=7", "chrome >= 30"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    //visualizer({
    // emitFile: true,
    // filename: "visualizer.html", //分析图生成的文件名
    // open: true, //如果存在本地服务端口，将在打包后自动展示
    //}),
  ],
  css: {
    //css预处理器
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/styles/index.less";',
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 9527,
    proxy: {
      "/api": {
        target: "https://lyb.cbb.plus",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  build: {
    minify: "esbuild",
    chunkSizeWarningLimit: 1500,
    cssTarget: "chrome61",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
