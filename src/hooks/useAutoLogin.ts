import authStore from "@/store/auth";
import routesStore from "@/store/routes";

const addRouter = () => {
  const user = localStorage.getItem("user");

  const $authStore = authStore();
  const $routesStore = routesStore();
  if (user) {
    const userInfo = JSON.parse(user) as User;
    $authStore.setUserInfo(userInfo);
    $routesStore.addRoutes(userInfo.role!);
  }
};

export default addRouter;
