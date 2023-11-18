import "@/styles/index.less";
import { createApp } from "vue";

import { useAutoLogin } from "./hooks";
import App from "./App.vue";

import { setupLanguage } from "@/language";
import { setupDirective } from "@/directives";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";

const app = createApp(App);

setupStore(app);
useAutoLogin();
setupDirective(app);
setupRouter(app);
setupLanguage(app);

/* 至少留5秒时间给开屏动画 */
setTimeout(
  () => {
    app.mount("#app");
  },
  import.meta.env.DEV ? 0 : 5000,
);

/* 开发环境下不触发百度统计 */
if (!import.meta.env.DEV) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line no-var
  var _hmt = _hmt || [];
  (function () {
    // eslint-disable-next-line no-var
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?2c84cd61316a5ce978ca513745ec7eaa";
    // eslint-disable-next-line no-var
    var s = document.getElementsByTagName("script")[0];
    s.parentNode!.insertBefore(hm, s);
  })();
}
