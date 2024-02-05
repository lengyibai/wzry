import { defineStore } from "pinia";
import { ref } from "vue";

import { RouterStore } from "@/store";
import { userDefaultInfo } from "@/default";
import { $input, $message, $privateTool, $tip, $tool } from "@/utils";
import { BASE_CONFIG, LOCAL_KEY } from "@/config";
import { router } from "@/router";

/** @description 用户相关 */
const AuthStore = defineStore("auth", () => {
  const $routerStore = RouterStore();

  /** 实时检测帐号状态 */
  let watching = false;

  const ExposeData = {
    /** 用户登录状态 */
    userStatus: ref(false),
    /** 用户相关信息 */
    user_data: ref<Global.UserData>(userDefaultInfo()),
  };
  const { userStatus, user_data } = ExposeData;

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

  const ExposeMethods = {
    /** @description 登录 */
    login(form: Global.UserData) {
      watching = true;
      userStatus.value = true;
      user_data.value = form;
      $routerStore.addRoutes(form.role);
      router.push(BASE_CONFIG.HOME_URL);
      localStorage.setItem(LOCAL_KEY.USER_DATA, $privateTool.encryption(form));
      watchStatus();
    },

    /** @description 自动登录 */
    autoLogin() {
      const local_user = localStorage.getItem(LOCAL_KEY.USER_DATA)!;
      watching = true;
      userStatus.value = true;
      user_data.value = $privateTool.decryption(local_user);
      $message(`${$tool.timeGreet}，${user_data.value.username}`);
      watchStatus();
    },

    /** @description 修改用户数据 */
    updateUserData(v: Partial<Global.UserData>) {
      user_data.value = {
        ...user_data.value,
        ...v,
      };

      localStorage.setItem(LOCAL_KEY.USER_DATA, $privateTool.encryption(user_data.value));
    },

    /** @description 设置二级密码 */
    setSecondaryPassword() {
      const _this = this;
      return new Promise<void>((resolve) => {
        $input({
          title: "二级密码验证",
          placeholder: "请输入二级密码",
          confirm(v, close) {
            if (user_data.value.secondaryPassword === v) {
              resolve();
              close();
              $message("验证成功！");
            } else {
              $message("密码错误", "error");
            }
          },
        });
        if (user_data.value.secondaryPassword) {
        } else {
          $message("你还没有设置二级密码，设置一下吧！");
          $input({
            title: "设置二级密码",
            placeholder: "请设置二级密码",
            confirm(v, close) {
              if (user_data.value.password === v) {
                $message("二级密码不能与卡片密码一样哦！重新输入一下吧！", "error");
                return;
              }

              _this.updateUserData({
                secondaryPassword: v,
              });
              resolve();
              close();
              $message("设置成功！");
            },
          });
        }
      });
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
