import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import useRouter from "./router/index";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import directives from "@/utils/directives";

import components from "@/components/index";

import "@/styles/index.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia).use(useRouter).use(directives).use(components).mount("#app");
