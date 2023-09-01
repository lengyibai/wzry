/* eslint-disable @typescript-eslint/no-unused-vars */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer"; //build 视图分析依赖文件
import Components from "unplugin-vue-components/vite"; //组件自动注册
import VueSetupExtend from "vite-plugin-vue-setup-extend"; //设置name
import legacyPlugin from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    VueSetupExtend(),
    Components({
      dts: "src/typings/components.d.ts", //生成在src路径下名为auto-import.d.ts的声明文件
      dirs: ["src/components"], //配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
    }),
    legacyPlugin({
      targets: ["last 2 versions", "safari >=7", "chrome >= 30"], //需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"], //面向IE11时需要此插件
    }),
    //visualizer({
    //  emitFile: true,
    //  filename: "visualizer.html", //分析图生成的文件名
    //  open: true, //如果存在本地服务端口，将在打包后自动展示
    //}),
  ],
  css: {
    //css预处理器
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/styles/index.less";', //全局less变量文件
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 9527,
    open: true,
    proxy: {
      "/api": {
        target: "https://lyb.cbb.plus", //目标url
        changeOrigin: true, //支持跨域
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
