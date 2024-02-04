import { LOCAL_KEY } from "@/config/modules/local-key";
import { RouterStore } from "@/store/modules/router";

/** @description 通过获取本地用户权限在路由还未挂载时动态添加路由 */
const useAutoLogin = () => {
  const $routerStore = RouterStore();

  const user = localStorage.getItem(LOCAL_KEY.USER_DATA);

  //通过获取本地用户权限，动态添加路由
  if (user) {
    const user_info = JSON.parse(user) as Global.UserData;
    $routerStore.addRoutes(user_info.role);
  }
};

export { useAutoLogin };
