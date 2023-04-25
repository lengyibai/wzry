import { createApp } from "vue";
import VConsole from "vconsole";

import App from "./App.vue";

import { flexible, setFontsize } from "@/utils";
import { setupRouter } from "@/router";
import { Store } from "@/config";
import i18n from "@/language";
import setupDirective from "@/directives";
import useAutoLogin from "@/hooks/useAutoLogin";

import "@/styles/index.less";

new VConsole();
flexible.trigger([4000, 1920], () => {
  document.documentElement.style.fontSize = "16px";
});
flexible.trigger([1920, 960], (v: number) => {
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

Store.setup(app);
useAutoLogin();
setupDirective(app);
setupRouter(app);

app.use(i18n).mount("#app");
