import { createPinia } from "pinia";
import { App } from "vue";

import audio from "./modules/audio";
import auth from "./modules/auth";
import collapse from "./modules/collapse";
import cssVar from "./modules/cssVar";
import device from "./modules/device";
import epigraph from "./modules/epigraph";
import equip from "./modules/equip";
import hero from "./modules/hero";
import heroDetail from "./modules/heroDetail";
import music from "./modules/music";
import router from "./modules/router";
import setting from "./modules/setting";
import skin from "./modules/skin";
import control from "./modules/control";
import vConsole from "./modules/vConsole";
import version from "./modules/version";

const setup = (app: App) => {
  const pinia = createPinia();
  app.use(pinia);
};

const Store = {
  audio,
  auth,
  collapse,
  cssVar,
  device,
  epigraph,
  equip,
  hero,
  heroDetail,
  music,
  router,
  setting,
  skin,
  control,
  vConsole,
  version,
  setup,
};

export { Store };
