import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import basicSSL from "@vitejs/plugin-basic-ssl";
//import legacy from "@vitejs/plugin-legacy";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const getViteEnv = (target: string): any => env[target];

  return {
    base: "/wztj/",
    plugins: [
      vue(),
      basicSSL(), //手机端可能需要注释掉才能下载召唤师卡
      VitePWA({
        selfDestroying: true,
        // 注入注册脚本到 HTML 中
        injectRegister: "script",
        // 使用 prompt 方式进行注册
        registerType: "autoUpdate",
        // 开发环境下启用 PWA 功能
        devOptions: {
          enabled: true,
        },
        // Workbox 配置
        workbox: {
          // 匹配需要被缓存的文件
          globPatterns: ["**/*.js", "**/*.html", "**/*.css", "**/*.svg", "**/*.png"],
        },
        manifest: {
          related_applications: [
            {
              platform: "webapp",
              url: "https://files.lyb.im/test/manifest.webmanifest",
            },
          ],
          // 显示模式
          display: "standalone",
          // 应用名称
          name: "王者荣耀图鉴",
          // 移动端
          short_name: "王者图鉴",
          // 主题颜色
          theme_color: "#000",
          // start_url: "/king-honor",
          icons: [
            {
              src: "wzry.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/index.less";',
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 9527,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      },
    },
    //* 打包去除 console.log && debugger
    esbuild: {
      pure:
        getViteEnv("VITE_CLEAR_LOG") === "1"
          ? ["alert", "console.log", "console.warn", "debugger"]
          : [],
    },
    build: {
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false, //禁用 gzip 压缩大小报告，可略微减少打包时间
      cssTarget: "chrome61",
      rollupOptions: {
        output: {
          manualChunks: {
            wzry_vue: ["vue"],
            wzry_vuePlugin: ["vue-router", "pinia", "mitt"],
            wzry_lodash: ["lodash"],
            wzry_dayjs: ["dayjs"],
            wzry_axios: ["axios"],
            wzry_i18n: ["vue-i18n"],
            wzry_pinyin_pro: ["pinyin-pro"],
            wzry_vueuse: ["@vueuse/core"],
          },
          chunkFileNames: "assets/js/wzry-[name]-[hash].js",
          entryFileNames: "assets/js/wzry-[name]-[hash].js",
          assetFileNames: "assets/[ext]/wzry-[name]-[hash].[ext]",
        },
      },
    },
  };
});
