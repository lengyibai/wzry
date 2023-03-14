import { defineStore } from "pinia";
import { ref } from "vue";

import switchStore from "./switch";

import { _login, deleteUser } from "@/api/modules/user";
import { HOME_URL, OVERDUE_DATA_TIME } from "@/config";
import { routerStore } from "@/store";
import { userDefaultInfo } from "@/default";
import router from "@/router";
import { TOOL } from "@/utils";

/** @description 用户相关 */
const authStore = defineStore("auth", () => {
  const $routerStore = routerStore();

  const userStatus = ref(false); //用户状态
  const timer = ref<Interval>(); //实时检测帐号状态
  const userInfo = ref<User>(TOOL.deepCopy(userDefaultInfo)); //用户相关信息

  /**
   * @description: 设置用户状态
   * @param status true登录状态
   */
  const setUserStatus = (status: boolean) => {
    userStatus.value = status;
  };

  /**
   * @description: 设置用户信息
   * @param data 从本地获取设置或编辑个人资料保存设置
   */
  const setUserInfo = (data: Partial<User>) => {
    userInfo.value = { ...userInfo.value, ...data };
  };

  /** @description 登录 */
  const login = async (form: User) => {
    const res = await _login(form).catch((err) => {
      throw err;
    });
    userInfo.value = res;
    userStatus.value = true;
    window.localStorage.setItem("user", JSON.stringify(res));
    $routerStore.addRoutes(res.role);
    router.push(HOME_URL);
    watchStatus();
  };

  /** @description 自动登录 */
  const autoLogin = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      const res = await _login(user).catch((err) => {
        throw err;
      });
      userInfo.value = res;
      userStatus.value = true;
      window.localStorage.setItem("user", JSON.stringify(res));
      switchStore().$msg("自动登录成功");
      watchStatus();
    } catch (err) {
      const error = err as Record<string, string>;

      switchStore().$msg(error.msg, "error");
      if (error.type === "WZRY_TOKEN") {
        clearToken();
      }
    }
  };

  /** @description 退出登录 */
  const logout = () => {
    clearToken();
    switchStore().$msg("退出成功");
  };

  /** @description 注销账号 */
  const logoff = async () => {
    const user = JSON.parse(localStorage.getItem("user")!) as User;
    const msg = await deleteUser(user.id);
    localStorage.removeItem("remember_user");
    clearToken();
    switchStore().$msg(msg);
  };

  /** @description 清除token */
  const clearToken = () => {
    clearInterval(timer.value);
    router.replace("/login");
    userStatus.value = false;
    timer.value = 0;
    userInfo.value = TOOL.deepCopy(userDefaultInfo);
    $routerStore.removeRoutes();
    localStorage.removeItem("user");
  };

  /** @description 实时检测帐号状态 */
  const watchStatus = () => {
    if (timer.value) return;
    timer.value = setInterval(() => {
      const token = Number(new Date().getTime().toString().slice(0, 10));
      const data_token = localStorage.getItem("data_token");
      if (token - Number(data_token) > OVERDUE_DATA_TIME) {
        clearInterval(timer.value);
        switchStore().$msg("数据每三天完整下载一次，即将开始下载", "error");
        setTimeout(async () => {
          localStorage.clear();
          location.reload();
        }, 5000);
        return;
      }

      if (!localStorage.getItem("user")) {
        switchStore().$msg("身份已过期，请重登录", "error");
        clearToken();
      }
    }, 3000);
  };

  return {
    /** 用户状态 */
    userStatus,
    /** 实时检测帐号状态 */
    timer,
    /** 用户相关信息 */
    userInfo,
    setUserStatus,
    setUserInfo,
    login,
    autoLogin,
    logout,
    clearToken,
    watchStatus,
    logoff,
  };
});

export default authStore;
export type AuthStore = ReturnType<typeof authStore>;
