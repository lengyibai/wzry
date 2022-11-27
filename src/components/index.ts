import { defineAsyncComponent, App } from "vue";

const components = import.meta.glob("@/components/**/*.vue");
export default function install(app: App) {
  Object.entries(components).forEach(([key, value]) => {
    const name = key.replace(/\/index.vue/g, "");
    app.component(name.slice(name.lastIndexOf("/") + 1), defineAsyncComponent(value as any));
  });
}
