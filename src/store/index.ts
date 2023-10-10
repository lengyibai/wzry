import { createPinia } from "pinia";
import { App } from "vue";

export { AudioStore } from "./modules/audio";
export { AuthStore } from "./modules/auth";
export { CollapseStore } from "./modules/collapse";
export { CssVarStore } from "./modules/cssVar";
export { DeviceStore } from "./modules/device";
export { EpigraphStore } from "./modules/epigraph";
export { EquipStore } from "./modules/equip";
export { HeroStore } from "./modules/hero";
export { HeroDetailStore } from "./modules/heroDetail";
export { MusicStore } from "./modules/music";
export { RouterStore } from "./modules/router";
export { SettingStore } from "./modules/setting";
export { SkinStore } from "./modules/skin";
export { VConsoleStore } from "./modules/vConsole";
export { VersionStore } from "./modules/version";

const setupStore = (app: App) => {
  const pinia = createPinia();
  app.use(pinia);
};

export default setupStore;
