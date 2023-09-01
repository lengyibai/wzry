import VConsole from "vconsole";
import { createApp } from "vue";

import App from "./App.vue";
import { useAutoLogin } from "./hooks";

import setupStore from "@/store";
import setupDirective from "@/directives";
import i18n from "@/language";
import { Util } from "@/utils";
import { setupRouter } from "@/router";

import "@/styles/index.less";

new VConsole();
Util.flexible.trigger([4000, 1920], () => {
  document.documentElement.style.fontSize = "16px";
});
Util.flexible.trigger([1920, 960], (v: number) => {
  Util.setFontsize([16, 14], v);
});

Util.flexible.trigger([960, 720], (v: number) => {
  Util.setFontsize([14, 12], v);
});

Util.flexible.trigger([720, 480], (v: number) => {
  Util.setFontsize([12, 10], v);
});

Util.flexible.trigger([480, 0], () => {
  document.documentElement.style.fontSize = "10px";
});

window.IMGBED = "https://lyb.cbb.plus/wzry-material";

const app = createApp(App);

setupStore(app);
useAutoLogin();
setupDirective(app);
setupRouter(app);

app.use(i18n).mount("#app");
