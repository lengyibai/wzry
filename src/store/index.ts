import { createPinia } from "pinia";
import { App } from "vue";

export * from "./modules/audio";
export * from "./modules/auth";
export * from "./modules/collapse";
export * from "./modules/cssVar";
export * from "./modules/device";
export * from "./modules/epigraph";
export * from "./modules/equip";
export * from "./modules/hero";
export * from "./modules/heroDetail";
export * from "./modules/music";
export * from "./modules/router";
export * from "./modules/setting";
export * from "./modules/skin";
export * from "./modules/version";
export * from "./modules/atlas";
export * from "./modules/barrage";

const setupStore = (app: App) => {
  const pinia = createPinia();
  app.use(pinia);
};

export { setupStore };
