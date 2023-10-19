import "@/styles/index.less";
import { createApp } from "vue";
import VConsole from "vconsole";

import { useAutoLogin } from "./hooks";
import App from "./App.vue";

import i18n from "@/language";
import setupDirective from "@/directives";
import setupRouter from "@/router";
import setupStore from "@/store";

new VConsole();

window.IMGBED = "https://lyb.cbb.plus/wzry-material";

const app = createApp(App);

setupStore(app);
useAutoLogin();
setupDirective(app);
setupRouter(app);

app.use(i18n).mount("#app");
