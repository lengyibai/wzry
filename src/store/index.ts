import { createPinia } from "pinia";
import { App } from "vue";

import { AudioStore } from "./modules/audio";
import { AuthStore } from "./modules/auth";
import { CollapseStore } from "./modules/collapse";
import { CssVarStore } from "./modules/cssVar";
import { DeviceStore } from "./modules/device";
import { EpigraphStore } from "./modules/epigraph";
import { EquipStore } from "./modules/equip";
import { HeroStore } from "./modules/hero";
import { HeroDetailStore } from "./modules/heroDetail";
import { MusicStore } from "./modules/music";
import { RouterStore } from "./modules/router";
import { SettingStore } from "./modules/setting";
import { SkinStore } from "./modules/skin";
import { VConsoleStore } from "./modules/vConsole";
import { VersionStore } from "./modules/version";

const setupStore = (app: App) => {
  const pinia = createPinia();
  app.use(pinia);
};

export {
  AudioStore,
  AuthStore,
  CollapseStore,
  CssVarStore,
  DeviceStore,
  EpigraphStore,
  EquipStore,
  HeroStore,
  HeroDetailStore,
  MusicStore,
  RouterStore,
  SettingStore,
  SkinStore,
  VConsoleStore,
  VersionStore,
};
export default setupStore;
