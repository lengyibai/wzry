import authStore from "@/store/auth";
import routesStore from "@/store/routes";

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
