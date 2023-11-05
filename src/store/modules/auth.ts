import { defineStore } from "pinia";
import { ref } from "vue";

import { RouterStore } from "@/store";
import { userDefaultInfo } from "@/default";
import { router } from "@/router";
import { API_USER } from "@/api";
import { $message } from "@/utils";
import { CONFIG } from "@/config";

/** @description 用户相关 */
const AuthStore = defineStore("auth", () => {
  const $routerStore = RouterStore();

  /** 实时检测帐号状态 */
  let timer: NodeJS.Timeout | undefined;

  /** 用户状态 */
  const userStatus = ref(false);
  /** 用户相关信息 */
  const userInfo = ref<User>(userDefaultInfo());

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
    try {
      const res = await API_USER.login(form);

      userInfo.value = res;
      userStatus.value = true;
      localStorage.setItem(CONFIG.LOCAL_KEY.USER_INFO, JSON.stringify(res));
      $routerStore.addRoutes(res.role);
      watchStatus();
      router.push(CONFIG.BASE.HOME_URL);
    } catch (error) {
      $message(error as string, "error");
      return Promise.reject(error);
    }
  };

  /** @description 自动登录 */
  const autoLogin = async () => {
    const user = JSON.parse(
      localStorage.getItem(CONFIG.LOCAL_KEY.USER_INFO) || "{}",
    );
    try {
      const res = await API_USER.login(user).catch((err) => {
        throw err;
      });
      userInfo.value = res;
      userStatus.value = true;
      localStorage.setItem(CONFIG.LOCAL_KEY.USER_INFO, JSON.stringify(res));
      $message("自动登录成功");
      watchStatus();
    } catch (err) {
      const error = err as Record<string, string>;

      $message(error.msg, "error");
      if (error.type === "WZRY_TOKEN") {
        clearToken();
      }
    }
  };

  /** @description 退出登录 */
  const logout = () => {
    clearToken();
    $message("退出成功");
  };

  /** @description 注销账号 */
  const logoff = async () => {
    const user = JSON.parse(
      localStorage.getItem(CONFIG.LOCAL_KEY.USER_INFO)!,
    ) as User;
    const msg = await API_USER.deleteUser(user.id);
    localStorage.removeItem(CONFIG.LOCAL_KEY.REMEMBER_USER);
    clearToken();
    $message(msg);
  };

  /** @description 清除token */
  const clearToken = () => {
    clearInterval(timer);
    router.replace("/login");
    userStatus.value = false;
    timer = undefined;
    userInfo.value = userDefaultInfo();
    $routerStore.removeRoutes();
    localStorage.removeItem(CONFIG.LOCAL_KEY.USER_INFO);
  };

  /** @description 实时检测帐号状态 */
  const watchStatus = () => {
    if (timer) return;
    timer = setInterval(() => {
      const token = Number(new Date().getTime().toString().slice(0, 10));
      const data_token = localStorage.getItem(CONFIG.LOCAL_KEY.TOKEN);

      //将当前实时通过时间生成的token进行和本地token相减，大于过期时间则更新数据
      if (token - Number(data_token) > CONFIG.BASE.OVERDUE_DATA_TIME) {
        clearInterval(timer);
        $message("数据每三天完整下载一次，即将开始下载", "error");
        setTimeout(async () => {
          localStorage.clear();
          location.reload();
        }, 5000);
        return;
      }

      if (!localStorage.getItem(CONFIG.LOCAL_KEY.USER_INFO)) {
        $message("数据已过期，请重登录", "error");
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

export { AuthStore };
