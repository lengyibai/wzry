import { createApp } from "vue";

import { useAutoLogin } from "./hooks";
import App from "./App.vue";

import { setupLanguage } from "@/language";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";

import "@/styles/index.less";

const body = document.querySelector(".body");
body!.addEventListener("click", () => {
  const app = createApp(App);
  setupStore(app);
  useAutoLogin();
  setupRouter(app);
  setupLanguage(app);
  app.mount("#app");
});
