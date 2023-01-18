import { defineStore } from "pinia";
import { ref } from "vue";

import switchStore from "./switch";

import { _login } from "@/api/main/user";
import { HOME_URL } from "@/config/config";
import router from "@/router";
import routesStore from "@/store/routes";

const authStore = defineStore("auth", () => {
  const userStatus = ref(false); // 用户状态
  const timer = ref<Interval | number>(0); //实时检测帐号状态
  // 用户相关信息
  const userInfo = ref<User>({
    id: "",
    password: "",
    nickname: "",
    headImg: "",
    wzryToken: "",
    role: 1,
  });

  /** @description: 设置用户状态 */
  const setUserStatus = (status: boolean) => {
    userStatus.value = status;
  };

  /** @description: 设置用户信息 */
  const setUserInfo = (data: User) => {
    userInfo.value = data;
  };

  /** @description: 登录 */
  const login = async (form: User) => {
    switchStore().$loading.show("登录中");
    switchStore().$clickAudio("登录");
    _login(form)
      .then((res) => {
        userInfo.value = res;
        userStatus.value = true;
        window.localStorage.setItem("user", JSON.stringify(res));
        routesStore().addRoutes(res.role);
        router.push(HOME_URL);
        switchStore().$msg("登录成功");
        watchStatus();
      })
      .catch((err) => {
        switchStore().$msg(err, "error");
      });
  };

  /** @description: 自动登录 */
  const autoLogin = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    switchStore().$loading.show("登录中");
    _login(user)
      .then((res) => {
        userInfo.value = res;
        userStatus.value = true;
        window.localStorage.setItem("user", JSON.stringify(res));
        switchStore().$msg("自动登录成功");
        watchStatus();
      })
      .catch(() => {
        switchStore().$msg("身份验证失败，请重新登录", "error");
        clearToken();
      })
      .finally(() => {
        switchStore().$loading.close();
      });
  };

  /** @description: 退出登录 */
  const logout = () => {
    clearToken();
    switchStore().$msg("退出成功");
  };

  /** @description: 清除token */
  const clearToken = () => {
    clearInterval(timer.value);
    userStatus.value = false;
    userInfo.value = {
      id: "",
      password: "",
      nickname: "",
      headImg: "",
      wzryToken: "",
      role: 1,
    };
    routesStore().removeRoutes();
    window.localStorage.removeItem("user");
    router.replace("/login");
  };

  /** @description: 实时检测帐号状态 */
  const watchStatus = () => {
    timer.value = setInterval(() => {
      if (!localStorage.getItem("user")) {
        offline();
      }
    }, 3000);
  };

  /** @description: 强制下线 */
  const offline = () => {
    switchStore().$msg("帐号在别处登录", "error");
    clearToken();
  };

  return {
    userStatus,
    timer,
    userInfo,
    setUserStatus,
    setUserInfo,
    login,
    autoLogin,
    logout,
    clearToken,
    offline,
    watchStatus,
  };
});

export default authStore;
export type AuthStore = ReturnType<typeof authStore>;
