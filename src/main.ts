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
app.use(i18n);

setTimeout(
  () => {
    app.mount("#app");
  },
  import.meta.env.DEV ? 0 : 5000,
);
