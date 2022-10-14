import { createRouter, createWebHashHistory } from 'vue-router';

import routes from './routes';

import authStore from '@/store/auth';
import switchStore from '@/store/globalSwitch';

const useRouter = createRouter({
  history: createWebHashHistory(),
  routes,
});

useRouter.beforeEach((to, from, next) => {
  const store = authStore();
  /* 如果状态为 true、则正常跳转 */
  if (store.userStatus) {
    next();
    return;
  }

  /* 如果本地存在token，但状态为false，则自动登录 */
  if (!store.userStatus && store.wzryToken) {
    store.getUserInfo().then(() => {
      // 如果是想进入登录页面，则直接跳转到首页
      if (to.meta.noVerify) {
        next('/');
        return;
      }
      next();
      switchStore().$tip('自动登录成功');
    });
    return;
  }

  /* 如果不存在token，则跳转登录 */
  if (!store.wzryToken) {
    // 如果是想进入登录页面，则直接进入
    if (to.meta.noVerify) {
      next();
    } else {
      next('/login');
    }
  }

  if (!to.path) {
    next('/404');
  }
});

useRouter.afterEach((to) => {
  document.title = `${to.meta.title}-王者荣耀后台管理系统`;
});

export default useRouter;
