import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";

import { isExist, isLogin } from "./modules/routeSheel";
import { staticRouter, errorRouter } from "./modules/staticRouter";

import { AuthStore, DeviceStore } from "@/store";
import { $loading } from "@/utils";
import { BASE_CONFIG } from "@/config/modules/base";
import { LOCAL_KEY } from "@/config";
import { useDataFinish } from "@/hooks";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
});

router.beforeEach(async (to, from, next) => {
  const $authStore = AuthStore();
  const $deviceStore = DeviceStore();

  const user_info = !!localStorage.getItem(LOCAL_KEY.USER_DATA);

  //浏览器版本过低，则跳转400，400较为特殊，如果跳转400则直接放行
  if (!$deviceStore.browser_status && to.path !== "/400") {
    next("/400");
    return;
  }

  //如果路径不在路由表，则跳转404
  if (!isExist(to.path)) {
    next({
      path: "/404",
      replace: true,
    });
    return;
  }

  //如果当前路由在路由表，但不在侧边栏（未登录状态，侧边栏为空），则跳转403
  if (to.matched.length === 0) {
    next("/403");
    return;
  }

  //如果需要登录，但是没有用户信息，则跳转登录
  if (isLogin(to.path) && !user_info) {
    next("/login");
    return;
  }

  //如果本地有用户信息，且目标路由为免验证路由，则跳转首页
  if (user_info && to.meta.noVerify) {
    next(BASE_CONFIG.HOME_URL);
    await useDataFinish.readPromise;
    return;
  }

  //如果未登录，但是本地存在用户信息，且能匹配权限，则直接放行
  if (user_info && !$authStore.user_status) {
    $authStore.autoLogin();
    await useDataFinish.readPromise;
  }

  /* 点击英雄详情会静默切换路由用于记录参数，此时不显示loading */
  if (!to.query.id && !from.query.id && to.path !== from.path) {
    $loading.show(`正在加载${to.meta.title}页`);
  }

  next();
});

router.afterEach((to, from) => {
  /* 点击英雄详情会静默切换路由用于记录参数，此时不显示loading */
  if (!to.query.id && !from.query.id && to.path !== from.path) {
    $loading.close();
  }

  document.title = `${to.meta.title || "正在进入"}-王者图鉴`;
});

const setupRouter = (app: App) => {
  app.use(router);
};

export { setupRouter, router };
