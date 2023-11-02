import "@/styles/index.less";
import { createApp } from "vue";

import { useAutoLogin } from "./hooks";
import App from "./App.vue";

import { i18n } from "@/language";
import { setupDirective } from "@/directives";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";

const app = createApp(App);

setupStore(app);
useAutoLogin();
setupDirective(app);
setupRouter(app);

setTimeout(() => {
  app.use(i18n).mount("#app");
}, 5000);
