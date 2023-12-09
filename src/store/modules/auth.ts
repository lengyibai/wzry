import { defineStore } from "pinia";
import { ref } from "vue";

import { VersionStore } from "./version";

import { RouterStore } from "@/store";
import { userDefaultInfo } from "@/default";
import { router } from "@/router";
import { API_USER } from "@/api";
import { $bus, $message } from "@/utils";
import { CONFIG } from "@/config";

/** @description 用户相关 */
const AuthStore = defineStore("auth", () => {
  const $routerStore = RouterStore();
  const $versionStore = VersionStore();

  /** 实时检测帐号状态 */
  let timer: NodeJS.Timeout | undefined;

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

      if (!localStorage.getItem(CONFIG.LOCAL_KEY.USER_INFO)) {
        $message("数据丢失，请重新登录", "error");
        clearToken();
        return;
      }

      //将当前实时通过时间生成的token进行和本地token相减，大于过期时间则更新数据
      if (token - Number(data_token) > CONFIG.BASE.OVERDUE_DATA_TIME) {
        clearInterval(timer);
        $bus.emit("confirm", {
          text: "您已经超过三天没有访问本站了，为保证数据实时性，请点击确定清除本地数据重新下载资源。",
          close: false,
          confirm: () => {
            localStorage.clear();
            clearToken();
            $versionStore.watchVersion();
          },
        });
        return;
      }
    }, 1000 * 10);
  };

  const ExposeData = {
    /** 用户状态 */
    userStatus: ref(false),
    /** 用户相关信息 */
    userInfo: ref<User>(userDefaultInfo()),
  };
  const { userStatus, userInfo } = ExposeData;

  const ExposeMethods = {
    /**
     * @description: 设置用户信息
     * @param data 从本地获取设置或编辑个人资料保存设置
     */
    setUserInfo(data: Partial<User>) {
      userInfo.value = { ...userInfo.value, ...data };
    },

    /** @description 登录 */
    async login(form: User) {
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
    },

    /** @description 自动登录 */
    async autoLogin() {
      const user = JSON.parse(localStorage.getItem(CONFIG.LOCAL_KEY.USER_INFO) || "{}");
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
    },

    /** @description 退出登录 */
    logout() {
      clearToken();
      $message("退出成功");
    },

    /** @description 注销账号 */
    async logoff() {
      const user = JSON.parse(localStorage.getItem(CONFIG.LOCAL_KEY.USER_INFO)!) as User;
      const msg = await API_USER.deleteUser(user.id);
      localStorage.removeItem(CONFIG.LOCAL_KEY.REMEMBER_USER);
      clearToken();
      $message(msg);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { AuthStore };
