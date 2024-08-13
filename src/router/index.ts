import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";

import { isExist } from "./modules/routeSheel";
import { staticRouter, errorRouter } from "./modules/staticRouter";

import { $loading } from "@/utils/loading";
import { useDevice } from "@/hooks/modules/useDevice";
import { ROUTE_PATH } from "@/config";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
});

/** 是否需要处理资源 */
let need_load = true;
/** 刷新页面时的路由地址 */
let refresh_path = "";
router.beforeEach(async (to, from, next) => {
  const { browser_status } = useDevice();

  //浏览器版本过低，则跳转400，400较为特殊，如果跳转400则直接放行
  if (!browser_status && to.path !== "/400") {
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

  //如果来自登录页，则说明资源已经下载完毕(注：当前路由判断不能与下面路由判断交换位置)
  if (from.path === "/login" && need_load) {
    need_load = false;

    //回到上一次访问页面
    if (refresh_path && !["/login", "/400", "/403", "/404"].includes(refresh_path)) {
      next(refresh_path);
    } else {
      next(ROUTE_PATH.HERO);
    }

    return;
  }

  //如果刷新页面，则去往登录页处理数据
  if (to.path !== "/login" && need_load) {
    refresh_path = to.path;
    next("/login");
    return;
  }

  /* 避免地址栏增加参数 */
  if (to.path !== from.path) {
    $loading.show(`正在加载${to.meta.title}页`);
  }

  next();
});

router.afterEach((to) => {
  $loading.close();
  document.title = `${to.meta.title || "正在进入"}-王者荣耀图鉴`;
});

const setupRouter = (app: App) => {
  app.use(router);
};

export { setupRouter, router };
