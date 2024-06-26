import { createPinia } from "pinia";
import type { App } from "vue";

export * from "./modules/atlas";
export * from "./modules/auth";
export * from "./modules/epigraph";
export * from "./modules/epigraphCollocation";
export * from "./modules/equip";
export * from "./modules/hero";
export * from "./modules/heroDetail";
export * from "./modules/knapsack";
export * from "./modules/lottery";
export * from "./modules/music";
export * from "./modules/router";
export * from "./modules/kingCrystal";
export * from "./modules/setting";
export * from "./modules/skin";
export * from "./modules/skinDebris";
export * from "./modules/version";
export * from "./modules/heroDebris";
export * from "./modules/marker";
export * from "./modules/supply";
export * from "./modules/time";
export * from "./modules/mail";
export * from "./modules/task";
export * from "./modules/yibao";

/** @description 挂载 */
const setupStore = (app: App) => {
  const pinia = createPinia();
  app.use(pinia);
};

export { setupStore };
