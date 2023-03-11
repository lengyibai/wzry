import { createApp } from "vue";
import VConsole from "vconsole";

import App from "./App.vue";

import { setupRouter } from "@/router";
import setupStore from "@/store";
import setupDirective from "@/directives";
import useAutoLogin from "@/hooks/useAutoLogin";
import { flexible, setFontsize } from "@/utils/flexible";

import "@/styles/index.less";

new VConsole();
flexible.trigger([1400, 960], (v: number) => {
  setFontsize([16, 14], v);
});

flexible.trigger([960, 720], (v: number) => {
  setFontsize([14, 12], v);
});

flexible.trigger([720, 480], (v: number) => {
  setFontsize([12, 10], v);
});

flexible.trigger([480, 0], () => {
  document.documentElement.style.fontSize = "10px";
});

const app = createApp(App);

setupStore(app);
useAutoLogin();
setupDirective(app);
setupRouter(app);

app.mount("#app");
