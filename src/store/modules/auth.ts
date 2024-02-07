import { defineStore } from "pinia";
import { ref } from "vue";
import dayjs from "dayjs";

import { EpigraphCollocationStore, RouterStore, SettingStore } from "@/store";
import { $input, $message, $privateTool, $tip, $tool } from "@/utils";
import { BASE_CONFIG, CUSTOM_TIP, DEFAULT, LOCAL_KEY, MESSAGE_TIP } from "@/config";
import { router } from "@/router";

/** @description 用户相关 */
const AuthStore = defineStore("auth", () => {
  const $routerStore = RouterStore();
  const $settingStore = SettingStore();
  const $epigraphCollocationStore = EpigraphCollocationStore();

  /** 实时检测帐号状态 */
  let watching = false;

  const ExposeData = {
    /** 用户登录状态 */
    user_status: ref(false),
    /** 用户相关信息 */
    user_data: ref<Global.UserData>(DEFAULT.userDefaultInfo()),
    /** 是否已经验证过二级密码 */
    is_check_sec_pwd: ref(false),
  };
  const { user_status, user_data, is_check_sec_pwd } = ExposeData;

  /** @description 登录进入网页 */
  const loginInto = () => {
    $settingStore.useUserSetting(user_data.value.settingConfig);
    $epigraphCollocationStore.useUserEpigraphSuit(user_data.value.epigraphSuit);
  };

  /** @description 实时检测帐号状态 */
  const watchStatus = () => {
    if (!watching) return;

    if (!localStorage.getItem(LOCAL_KEY.USER_DATA)) {
      $tip({
        text: CUSTOM_TIP.vu90,
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
      user_status.value = true;
      user_data.value = form;
      $routerStore.addRoutes(form.role);
      router.push(BASE_CONFIG.HOME_URL);
      localStorage.setItem(LOCAL_KEY.USER_DATA, $privateTool.encryption(form));
      watchStatus();
      loginInto();
    },

    /** @description 自动登录 */
    autoLogin() {
      const local_user = localStorage.getItem(LOCAL_KEY.USER_DATA)!;
      watching = true;
      user_status.value = true;
      user_data.value = $privateTool.decryption(local_user);
      $message(`${$tool.timeGreet}，${user_data.value.username}`);
      watchStatus();
      loginInto();
    },

    /** @description 修改用户数据 */
    updateUserData(v: Partial<Global.UserData>) {
      user_data.value = {
        ...user_data.value,
        ...v,
      };

      user_data.value.updateTime = dayjs().valueOf();
      localStorage.setItem(LOCAL_KEY.USER_DATA, $privateTool.encryption(user_data.value));
    },

    /** @description 设置二级密码 */
    setSecondaryPassword() {
      const _this = this;
      return new Promise<void>((resolve) => {
        //如果已经验证过，下次免验证
        if (is_check_sec_pwd.value) {
          resolve();
          return;
        }

        $input({
          title: "二级密码验证",
          placeholder: "请输入二级密码",
          confirm(v, close) {
            if (user_data.value.secondaryPassword === v) {
              resolve();
              close();
              $message(MESSAGE_TIP.s24z);
              is_check_sec_pwd.value = true;
            } else {
              $message(MESSAGE_TIP.rh43, "error");
            }
          },
        });

        if (user_data.value.secondaryPassword) {
        } else {
          $message(MESSAGE_TIP.n32v);
          $input({
            title: "设置二级密码",
            placeholder: "请设置二级密码",
            confirm(v, close) {
              if (user_data.value.password === v) {
                $message(MESSAGE_TIP.w89h, "error");
                return;
              }

              _this.updateUserData({
                secondaryPassword: v,
              });
              resolve();
              close();
              $message(MESSAGE_TIP.km30);
            },
          });
        }
      });
    },

    /** @description 退卡 */
    exitCard() {
      watching = false;
      user_status.value = false;
      is_check_sec_pwd.value = false;
      user_data.value = DEFAULT.userDefaultInfo();
      $routerStore.removeRoutes();
      localStorage.removeItem(LOCAL_KEY.USER_DATA);
      router.replace("/login");
      $message(MESSAGE_TIP.y2l2);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { AuthStore };
