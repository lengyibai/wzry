import { AuthStore, RouterStore } from "@/store";

/** @description 通过获取本地用户权限在路由还未挂载时动态添加路由 */
const useAutoLogin = () => {
  const user = localStorage.getItem("user");

  const $authStore = AuthStore();
  const $routerStore = RouterStore();

  //通过获取本地用户权限，动态添加路由
  if (user) {
    const userInfo = JSON.parse(user) as User;
    $authStore.setUserInfo(userInfo);
    $routerStore.addRoutes(userInfo.role || 0);
  }
};

export { useAutoLogin };
