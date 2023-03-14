import { createPinia } from "pinia";
import { App } from "vue";

import audioStore from "./modules/audio";
import authStore from "./modules/auth";
import collapseStore from "./modules/collapse";
import cssVarStore from "./modules/cssVar";
import deviceStore from "./modules/device";
import epigraphStore from "./modules/epigraph";
import equipStore from "./modules/equip";
import heroStore from "./modules/hero";
import heroDetailStore from "./modules/heroDetail";
import musicStore from "./modules/music";
import routerStore from "./modules/router";
import settingStore from "./modules/setting";
import skinStore from "./modules/skin";
import switchStore from "./modules/switch";
import vConsoleStore from "./modules/vConsole";
import versionStore from "./modules/version";

const setupStore = (app: App) => {
  const pinia = createPinia();
  app.use(pinia);
};

export {
  audioStore,
  authStore,
  collapseStore,
  cssVarStore,
  deviceStore,
  epigraphStore,
  equipStore,
  heroStore,
  heroDetailStore,
  musicStore,
  routerStore,
  settingStore,
  skinStore,
  switchStore,
  vConsoleStore,
  versionStore,
  setupStore,
};
