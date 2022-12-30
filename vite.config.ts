// eslint-disable-next-line
// @ts-nocheck
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint";
// import viteCompression from "vite-plugin-compression"; //开启压缩，注：需要配合nginx开启gzip，此项目并不部署，可忽略
/* viteCompression({
      deleteOriginFile: true,
    }),
 */
import { visualizer } from "rollup-plugin-visualizer"; //build 视图分析依赖文件

import Components from "unplugin-vue-components/vite";

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    Components({
      dts: "src/typings/components.d.ts", // 生成在src路径下名为auto-import.d.ts的声明文件
      dirs: ["src/components"], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
    }),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
    }),
    visualizer({
      emitFile: true,
      filename: "visualizer.html", //分析图生成的文件名
      open: true, //如果存在本地服务端口，将在打包后自动展示
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 9527,
    open: true,
    proxy: {
      "/api": {
        target: "https://lengyibai.gitee.io/wzry",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    minify: "terser",
    chunkSizeWarningLimit: 1500,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
