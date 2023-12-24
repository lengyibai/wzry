import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";

import { isExist, isLogin } from "./modules/routeSheel";
import { staticRouter, errorRouter } from "./modules/staticRouter";

import { AuthStore, DeviceStore } from "@/store";
import { $loading } from "@/utils";
import { BASE_CONFIG } from "@/config/modules/base";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
});

router.beforeEach((to, from, next) => {
  const $authStore = AuthStore();
  const $deviceStore = DeviceStore();

  const is_exist = isExist(to.path);
  const is_login = isLogin(to.path);
  const token = $authStore.userInfo?.wzryToken;
  const no_loading = ["/403", "/404", "/400"];

  /* 点击英雄详情会静默切换路由用于记录参数，此时不显示loading */
  if (!to.query.id && !from.query.id && !no_loading.includes(to.path) && to.path !== from.path) {
    $loading.show(to.meta.title as string);
  }

  //浏览器版本过低
  if (!$deviceStore.browser_status && to.path !== "/400") {
    next("/400");
    return;
  } else if ($deviceStore.browser_status && to.path === "/400") {
    next("/");
    return;
  } else if (to.path === "/400") {
    next();
    return;
  }

  //如果路径不在路由表
  if (!is_exist) {
    next("/404");
    return;
  }
  //如果当前路由在路由表，但不在侧边栏
  else if (to.matched.length === 0) {
    next("/403");
    return;
  }

  //如果需要登录，但是没有用户信息
  else if (is_login && !token) {
    next("/login");
    return;
  }

  //如果本地有用户信息，并且跳转到静态路由
  else if (token && to.meta.noVerify) {
    next(BASE_CONFIG.HOME_URL);
    return;
  }

  //如果未登录，但是本地存在用户信息，且能匹配权限
  else if (!$authStore.userStatus && token) {
    $authStore.autoLogin();
  }

  next();
});

router.afterEach((to, from) => {
  const no_loading = ["/403", "/404", "/400"];

  /* 点击英雄详情会静默切换路由用于记录参数，此时不显示loading */
  if (!to.query.id && !from.query.id && !no_loading.includes(to.path) && to.path !== from.path) {
    $loading.close();
  }

  document.title = `${to.meta.title || "正在进入"}-王者图鉴`;
});

const setupRouter = (app: App) => {
  app.use(router);
};

export { setupRouter, router };
