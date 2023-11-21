import "@/styles/index.less";
import { createApp } from "vue";

import { useAutoLogin } from "./hooks";
import App from "./App.vue";
import { $tool } from "./utils";

import { setupLanguage } from "@/language";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";

const app = createApp(App);

setupStore(app);
useAutoLogin();
setupRouter(app);
setupLanguage(app);

/* 至少留5秒时间给开屏动画 */
setTimeout(
  () => {
    app.mount("#app");
    $tool.titleTip();
  },
  import.meta.env.DEV ? 0 : 5000,
);
