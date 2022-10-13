import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Mitt from 'mitt';
import App from './App.vue';
import useRouter from './router/index.js';

import directives from '@/utils/directives.js';

import '@/styles/index.css';

import components from '@/components/index.js';

const app = createApp(App);

//挂载事件总线
app.config.globalProperties.$bus = new Mitt();

app.use(createPinia()).use(useRouter).use(directives)
  .use(components)
  .mount('#app');
