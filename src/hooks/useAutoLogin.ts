import { ResultData } from "@/api/interface/result";
import authStore from "@/store/auth";
import routesStore from "@/store/routes";
import switchStore from "@/store/globalSwitch";

const addRouter = () => {
  const user = localStorage.getItem("user");

  const $authStore = authStore();
  const $routesStore = routesStore();
  const $switchStore = switchStore();
  if (user) {
    const userInfo = JSON.parse(user) as ResultData.User;
    $authStore.setUserInfo(userInfo);
    $routesStore.addRoutes(userInfo.role);
    $authStore.watchStatus();
  } else {
    $switchStore.$tip("身份校验失败，请重新登录", "error");
    $authStore.clearToken();
  }
};

export default addRouter;
