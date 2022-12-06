import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import useRouter from "./router/index";

import directives from "@/utils/directives";

import "@/styles/index.css";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia).use(useRouter).use(directives).mount("#app");
