import { defineStore } from "pinia";
import { ref } from "vue";

import { RouterStore } from "@/store";
import { userDefaultInfo } from "@/default";
import { $message, $tip, $tool } from "@/utils";
import { BASE_CONFIG, LOCAL_KEY } from "@/config";
import { router } from "@/router";

/** @description 用户相关 */
const AuthStore = defineStore("auth", () => {
  const $routerStore = RouterStore();

  /** 实时检测帐号状态 */
  let watching = false;

  /** @description 实时检测帐号状态 */
  const watchStatus = () => {
    if (!watching) return;

    if (!localStorage.getItem(LOCAL_KEY.USER_DATA)) {
      $tip({
        text: "数据丢失，请刷新页面。",
        btnText: "立刻刷新",
      }).then(() => {
        location.reload();
      });
      return;
    }

    setTimeout(watchStatus, 1000 * 5);
  };

  const ExposeData = {
    /** 用户登录状态 */
    userStatus: ref(false),
    /** 用户相关信息 */
    user_data: ref<Global.UserData>(userDefaultInfo()),
  };
  const { userStatus, user_data } = ExposeData;

  const ExposeMethods = {
    /** @description 登录 */
    login(form: Global.UserData) {
      watching = true;
      userStatus.value = true;
      user_data.value = form;
      $routerStore.addRoutes(form.role);
      router.push(BASE_CONFIG.HOME_URL);
      localStorage.setItem(LOCAL_KEY.USER_DATA, JSON.stringify(form));
      watchStatus();
    },

    /** @description 自动登录 */
    autoLogin() {
      const local_user = localStorage.getItem(LOCAL_KEY.USER_DATA)!;
      watching = true;
      userStatus.value = true;
      user_data.value = JSON.parse(local_user);
      $message(`${$tool.timeGreet}，${user_data.value.username}`);
      watchStatus();
    },

    /** @description 修改用户数据 */
    updateUserData(v: Partial<Global.UserData>) {
      user_data.value = {
        ...user_data.value,
        ...v,
      };

      localStorage.setItem(LOCAL_KEY.USER_DATA, JSON.stringify(user_data.value));
    },

    /** @description 退卡 */
    exitCard() {
      watching = false;
      userStatus.value = false;
      user_data.value = userDefaultInfo();
      $routerStore.removeRoutes();
      localStorage.removeItem(LOCAL_KEY.USER_DATA);
      router.replace("/login");
      $message("退卡成功");
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { AuthStore };
