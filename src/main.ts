import "@/styles/index.less";
import { createApp } from "vue";

import { useAutoLogin } from "./hooks";
import App from "./App.vue";

import { setupLanguage } from "@/language";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";

const app = createApp(App);

setupStore(app);
useAutoLogin();
setupRouter(app);
setupLanguage(app);

const body = document.querySelector(".body");
body!.addEventListener("click", () => {
  app.mount("#app");
});
