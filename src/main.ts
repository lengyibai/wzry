import { createApp } from "vue";

import App from "./App.vue";
import { _decryption } from "./utils/privateTool";

import { setupRouter } from "@/router";
import { setupLanguage } from "@/language";
import { RouterStore, setupStore } from "@/store";
import { LOCAL_KEY } from "@/config";

import "@/styles/index.less";

const body = document.querySelector(".body");
body!.addEventListener("click", () => {
  const app = createApp(App);
  setupStore(app);
  setupLanguage(app);

  //通过获取本地用户权限在路由还未挂载时动态添加路由
  const $routerStore = RouterStore();

  const user = localStorage.getItem(LOCAL_KEY.USER_DATA);

  //通过获取本地用户权限，动态添加路由
  if (user) {
    const user_info = _decryption(user);
    $routerStore.addRoutes(user_info.role);
  }

  setupRouter(app);
  app.mount("#app");
});

if (import.meta.env.PROD) {
  //eslint-disable-next-line no-var
  var _hmt: any = _hmt || [];
  (function () {
    const hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?2c84cd61316a5ce978ca513745ec7eaa";
    const s = document.getElementsByTagName("script")[0];
    s.parentNode!.insertBefore(hm, s);
  })();
}
