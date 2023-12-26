import { LOCAL_KEY } from "@/config/modules/local-key";
import { AuthStore } from "@/store/modules/auth";
import { RouterStore } from "@/store/modules/router";

/** @description 通过获取本地用户权限在路由还未挂载时动态添加路由 */
const useAutoLogin = () => {
  const $authStore = AuthStore();
  const $routerStore = RouterStore();

  const user = localStorage.getItem(LOCAL_KEY.USER_INFO);

  //通过获取本地用户权限，动态添加路由
  if (user) {
    const userInfo = JSON.parse(user) as Global.User;
    $authStore.setUserInfo(userInfo);
    $routerStore.addRoutes(userInfo.role || 0);
  }
};

export { useAutoLogin };
