import { defineStore } from "pinia";
import { ref } from "vue";

import { RouterStore } from "./router";
import { LotteryStore } from "./lottery";
import { SupplyStore } from "./supply";
import { TimeStore } from "./time";
import { MailStore } from "./mail";
import { TaskStore } from "./task";
import { KnapsackStore } from "./knapsack";
import { MarkerStore } from "./marker";
import { SettingStore } from "./setting";
import { EpigraphCollocationStore } from "./epigraphCollocation";
import { YibaoStore } from "./yibao";

import { _timeGreet, _mergeConfig } from "@/utils/tool";
import { _decryption, _encryption } from "@/utils/privateTool";
import { $tip, $message, $input } from "@/utils/busTransfer";
import { useUserConfigFinish, resetPromise } from "@/hooks";
import { router } from "@/router";
import { BASE_CONFIG, CUSTOM_TIP, DEFAULT, LOCAL_KEY, MESSAGE_TIP } from "@/config";

/** @description 用户相关 */
const AuthStore = defineStore("auth", () => {
  const $routerStore = RouterStore();
  const $settingStore = SettingStore();
  const $knapsackStore = KnapsackStore();
  const $lotteryStore = LotteryStore();
  const $markerStore = MarkerStore();
  const $supplyStore = SupplyStore();
  const $timeStore = TimeStore();
  const $mailStore = MailStore();
  const $taskStore = TaskStore();
  const $yibaoStore = YibaoStore();
  const $epigraphCollocationStore = EpigraphCollocationStore();

  /** 实时检测帐号状态 */
  let watching = false;
  /** 是否已经验证过二级密码 */
  let is_check_sec_pwd = false;

  const ExposeData = {
    /** 用户登录状态 */
    user_status: ref(false),
    /** 用户相关信息 */
    user_data: ref<User.Data>(DEFAULT.userInfoDefault()),
  };
  const { user_status, user_data } = ExposeData;

  /** @description 登录进入网页 */
  const loginInto = () => {
    watching = true;
    user_status.value = true;
    $mailStore.useUserMail(user_data.value.mail, user_data.value.mallMark);
    $taskStore.useUserTask(user_data.value.taskFinish, user_data.value.taskStatus);
    $supplyStore.useUserSupply(user_data.value.supply);
    $lotteryStore.useUserLottery(user_data.value.lottery);
    $knapsackStore.useUserKnapsack(user_data.value.knapsack);
    $markerStore.useUserMarker(user_data.value.behaviorMarker);
    $settingStore.useUserSetting(user_data.value.settingConfig);
    $epigraphCollocationStore.useUserEpigraphSuit(user_data.value.epigraphSuit);
    $yibaoStore.useUserYiBao(user_data.value.yibao);

    //由于登录可能会推送每日签到福袋，所以需要获取到邮箱福袋配置才能推送
    $mailStore.getAllMail().then(() => {
      $timeStore.enableTime();
    });

    watchStatus();
    useUserConfigFinish.readyDataResolve();
    router.push(BASE_CONFIG.HOME_URL);

    //竖版提示
    if (window.innerWidth < window.innerHeight) {
      $tip({
        text: CUSTOM_TIP.wi79,
      });
    }
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
    login(form: User.Data) {
      user_data.value = form;
      $routerStore.addRoutes(form.role);
      localStorage.setItem(LOCAL_KEY.USER_DATA, _encryption(form));
      loginInto();
    },

    /** @description 自动登录 */
    autoLogin() {
      const local_user = localStorage.getItem(LOCAL_KEY.USER_DATA)!;
      user_data.value = _decryption(local_user);
      $message(`${_timeGreet}，${user_data.value.username}`);
      loginInto();
    },

    /** @description 修改用户数据
     * @param v 修改的数据
     */
    updateUserData(v: DeepPartial<User.Data>) {
      user_data.value = _mergeConfig(v, user_data.value) as User.Data;
      localStorage.setItem(LOCAL_KEY.USER_DATA, _encryption(user_data.value));
    },

    /** @description 设置二级密码 */
    setSecondaryPassword() {
      const _this = this;
      return new Promise<void>((resolve) => {
        //如果已经验证过，下次免验证
        if (is_check_sec_pwd) {
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
              is_check_sec_pwd = true;
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
      is_check_sec_pwd = false;
      user_data.value = DEFAULT.userInfoDefault();
      $routerStore.removeRoutes();
      $lotteryStore.resetStatus();
      $supplyStore.interruptCountdown();
      $timeStore.interrupt();
      $mailStore.clearMail();
      $taskStore.resetTask();
      $yibaoStore.resetDefaultPart();
      localStorage.removeItem(LOCAL_KEY.USER_DATA);
      resetPromise();
      $message(MESSAGE_TIP.y2l2);
      router.replace("/login");
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { AuthStore };
