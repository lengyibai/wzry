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

setTimeout(
  () => {
    app.mount("#app");
  },
  import.meta.env.DEV ? 0 : 5000,
);
