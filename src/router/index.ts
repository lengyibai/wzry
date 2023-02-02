import { createRouter, createWebHistory } from "vue-router";

import { isExist, isLogin } from "./modules/routeSheel";
import { staticRouter, errorRouter } from "./modules/staticRouter";

import { HOME_URL } from "@/config";
import switchStore from "@/store/switch";
import authStore from "@/store/auth";
import deviceStore from "@/store/device";

const useRouter = createRouter({
  history: createWebHistory(),
  routes: [...staticRouter, ...errorRouter],
});

useRouter.beforeEach(async (to, from, next) => {
  const $authStore = authStore();
  const $deviceStore = deviceStore();

  const is_exist = isExist(to.path);
  const is_login = isLogin(to.path);
  const token = $authStore.userInfo?.wzryToken;

  //如果当前路径不等于跳转路径&&跳转路径非403、404&&存在title，则使用loading
  if (to.path !== from.path && !["/403", "/404", "/400"].includes(to.path) && to.meta.title) {
    switchStore().$loading.show("正在加载" + to.meta.title + "页面");
  }

  //浏览器版本过低
  if (!$deviceStore.browser_status && to.path !== "/400") {
    next("/400");
    return;
  } else if ($deviceStore.browser_status && to.path === "/400") {
    next("/");
    return;
  }

  // 如果路径不在路由表
  if (!is_exist) {
    next("/404");
    return;
  }
  //如果当前路由在路由表，但不在侧边栏
  else if (to.matched.length === 0) {
    next("/403");
    return;
  }

  // 如果需要登录，但是没有用户信息
  else if (is_login && !token) {
    next("/login");
    return;
  }

  // 如果本地有用户信息
  else if (token && to.meta.noVerify) {
    next(HOME_URL);
    return;
  }

  // 如果未登录，但是本地存在用户信息，且能匹配权限
  else if (!$authStore.userStatus && token) {
    $authStore.autoLogin();
  }

  next();
});

useRouter.afterEach((to) => {
  switchStore().$loading.close();
  document.title = `${to.meta.title || "正在进入"}-王者荣耀后台管理系统`;
});

export default useRouter;
