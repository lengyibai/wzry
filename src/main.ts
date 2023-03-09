import { createApp } from "vue";
import VConsole from "vconsole";

import App from "./App.vue";
import useRouter from "./router";
import setupStore from "./store";

import useAutoLogin from "@/hooks/useAutoLogin";
import directives from "@/utils/directives";

import "@/styles/index.less";

new VConsole();

const app = createApp(App);

setupStore(app);

app.use(directives);

useAutoLogin();

app.use(useRouter).mount("#app");
