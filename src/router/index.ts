import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";

import { isExist } from "./modules/routeSheel";
import { staticRouter, errorRouter } from "./modules/staticRouter";

import { $loading } from "@/utils/loading";
import { useDevice } from "@/hooks/modules/useDevice";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
});

let downloading = true;
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

  //如果来自登录页，则说明资源已经下载完毕
  if (from.path === "/login") {
    downloading = false;
  }

  //如果刷新页面，则去往登录页处理数据
  if (to.path !== "/login" && downloading) {
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
  document.title = `${to.meta.title || "正在进入"}-王者图鉴`;
});

const setupRouter = (app: App) => {
  app.use(router);
};

export { setupRouter, router };
