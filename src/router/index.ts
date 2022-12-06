import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouter, errorRouter } from "@/router/modules/staticRouter";
import switchStore from "@/store/globalSwitch";
import authStore from "@/store/auth";
import NProgress from "nprogress"; // 导入 nprogress模块
import "nprogress/nprogress.css"; // 导入样式，否则看不到效果
NProgress.configure({ showSpinner: false }); // 显示右上角螺旋加载提示

const useRouter = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
});

useRouter.beforeEach(async (to, from, next) => {
  NProgress.start(); //开启进度条
  const token = localStorage.getItem("wzryToken");

  const $authStore = authStore();
  const $switchStore = switchStore();

  /* 未登录，但存在token */
  if (!$authStore.userStatus && token) {
    //获取用户信息
    await $authStore.getUserInfo();
    //回到上次位置
    next({ path: to.path, query: to.query, replace: true });
    $switchStore.$tip("自动登录成功");
    return;
  } else if (!token && !to.meta.noVerify) {
    /*不存在token，需要权限，跳转登录 */
    next({ path: "/login", replace: true });
    return;
  } else if (token && to.meta.noVerify) {
    /* 如果本地存在token，但状态为false，在登录页面，则直接跳转到首页 */
    next("/home");
    return;
  }

  /* 正常访问页面 */
  next();
});

useRouter.afterEach((to) => {
  document.title = `${to.meta.title || "正在进入"}-王者荣耀后台管理系统`;
  NProgress.done(); //完成进度条
});

export default useRouter;
