import { defineAsyncComponent } from 'vue';

const components = import.meta.glob('@/components/**/*.vue');
export default function install(app) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.replace(/\/index.vue/g, '');
    app.component(name.slice(name.lastIndexOf('/') + 1), defineAsyncComponent(value));
  }
}
