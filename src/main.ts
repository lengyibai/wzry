import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import useRouter from "./router";
import useAutoLogin from "@/hooks/useAutoLogin";

import directives from "@/utils/directives";

import "@/styles/index.less";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia).use(directives);

useAutoLogin();

app.use(useRouter).mount("#app");
