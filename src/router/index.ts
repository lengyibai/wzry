import { createRouter, createWebHashHistory } from "vue-router";

import { isExist } from "./modules/routeSheel";
import { staticRouter, errorRouter } from "./modules/staticRouter";

import switchStore from "@/store/switch";
import authStore from "@/store/auth";
import { HOME_URL } from "@/config/config";

const useRouter = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
});

useRouter.beforeEach(async (to, from, next) => {
  if (!from.meta.noVerify) {
    switchStore().$loading.show("正在加载" + to.meta.title + "页面");
  }

  const $authStore = authStore();

  const token = $authStore.userInfo?.wzryToken;
  const is_exist = isExist(to.path);

  // 如果路径不存在
  if (!is_exist[0]) {
    next("/404");
    return;
  }
  //如果没有权限
  else if (to.matched.length === 0) {
    next("/403");
    return;
  }
  // 如果需要登录，但是没有用户信息
  else if (is_exist[1] && !token) {
    next("/login");
    return;
  }
  // 如果当前处于登录/404/403/500页面，但是本地有用户信息
  else if (token && to.meta.noVerify) {
    next(HOME_URL);
    return;
  }
  // 如果未登录，但是本地存在用户信息，且能匹配权限
  else if (!$authStore.userStatus && token && to.matched.length !== 0) {
    $authStore.autoLogin();
  }

  next();
});

useRouter.afterEach((to) => {
  document.title = `${to.meta.title || "正在进入"}-王者荣耀后台管理系统`;
  switchStore().$loading.close();
});

export default useRouter;
