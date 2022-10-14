import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import useRouter from './router/index';

import directives from '@/utils/directives';

import '@/styles/index.css';

import components from '@/components/index';

const app = createApp(App);

app.use(createPinia()).use(useRouter).use(directives)
  .use(components)
  .mount('#app');
