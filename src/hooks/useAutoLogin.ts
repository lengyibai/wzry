import authStore from "@/store/auth";
import routesStore from "@/store/routes";

/** @description 通过获取本地用户权限在路由还未挂载时动态添加路由 */
const addRouter = () => {
  const user = localStorage.getItem("user");

  const $authStore = authStore();
  const $routesStore = routesStore();

  //通过获取本地用户权限，动态添加路由
  if (user) {
    const userInfo = JSON.parse(user) as User;
    $authStore.setUserInfo(userInfo);
    $routesStore.addRoutes(userInfo.role || 0);
  }
};

export default addRouter;
