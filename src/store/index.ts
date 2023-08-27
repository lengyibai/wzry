import { createPinia } from "pinia";
import { App } from "vue";

const setup = (app: App) => {
  const pinia = createPinia();
  app.use(pinia);
};

export default setup;
