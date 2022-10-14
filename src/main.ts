import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import useRouter from './router/index.js';

import directives from '@/utils/directives.js';

import '@/styles/index.css';

import components from '@/components/index.js';

const app = createApp(App);

app.use(createPinia()).use(useRouter).use(directives)
  .use(components)
  .mount('#app');
