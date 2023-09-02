import "@/styles/index.less";
import { createApp } from "vue";
import VConsole from "vconsole";

import { useAutoLogin } from "./hooks";
import App from "./App.vue";

import { $flexible } from "@/utils";
import i18n from "@/language";
import setupDirective from "@/directives";
import setupRouter from "@/router";
import setupStore from "@/store";

new VConsole();
$flexible.init.trigger([4000, 1920], () => {
  document.documentElement.style.fontSize = "16px";
});
$flexible.init.trigger([1920, 960], (v: number) => {
  $flexible.setFontsize([16, 14], v);
});

$flexible.init.trigger([960, 720], (v: number) => {
  $flexible.setFontsize([14, 12], v);
});

$flexible.init.trigger([720, 480], (v: number) => {
  $flexible.setFontsize([12, 10], v);
});

$flexible.init.trigger([480, 0], () => {
  document.documentElement.style.fontSize = "10px";
});

window.IMGBED = "https://lyb.cbb.plus/wzry-material";

const app = createApp(App);

setupStore(app);
useAutoLogin();
setupDirective(app);
setupRouter(app);

app.use(i18n).mount("#app");
