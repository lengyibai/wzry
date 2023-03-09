import { createApp } from "vue";
import VConsole from "vconsole";

import App from "./App.vue";

import { setupRouter } from "@/router";
import setupStore from "@/store";
import setupDirective from "@/directives";
import useAutoLogin from "@/hooks/useAutoLogin";

import "@/styles/index.less";

new VConsole();

const app = createApp(App);

setupStore(app);
useAutoLogin();
setupDirective(app);
setupRouter(app);

app.mount("#app");
