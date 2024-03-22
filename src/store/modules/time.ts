import { defineStore, storeToRefs } from "pinia";
import dayjs from "dayjs";

import { MarkerStore } from "./marker";
import { MailStore } from "./mail";
import { SupplyStore } from "./supply";
import { AuthStore } from "./auth";

import { _checkTimeStamp } from "@/utils/tool";
import { $message } from "@/utils/busTransfer";
import { MESSAGE_TIP } from "@/config";
import { useWeekCard } from "@/hooks";

/** @description 新的一天处理事务 */
const TimeStore = defineStore("time", () => {
  const $markerStore = MarkerStore();
  const $mailStore = MailStore();
  const $supplyStore = SupplyStore();
  const $authStore = AuthStore();

  let timer: NodeJS.Timeout;

  /* 当时间为第二天的时候执行 */
  const newDay = () => {
    $message(MESSAGE_TIP.xu03);
    $markerStore.addMarkerNum("mm27");
    $mailStore.sign();
    $supplyStore.sign();

    $authStore.updateUserData({
      lastLoginTime: dayjs().valueOf(),
    });
    useWeekCard();
  };

  /* 实时签到判断 */
  const checkSign = (user_data: Global.UserData) => {
    //是否已经是新的一天
    const new_day = _checkTimeStamp(user_data.lastLoginTime) === 1;
    if (new_day) newDay();
  };

  /* 实时双倍卡判断 */
  const checkDoubleCard = (user_data: Global.UserData) => {
    const keys = ["doubleGoldCardExpireTime", "doubleExpCardExpireTime"] as const;
    keys.forEach((item) => {
      if (user_data[item] < dayjs().valueOf()) {
        $authStore.updateUserData({
          [item]: 0,
        });
      }
    });
  };

  const ExposeMethods = {
    /** @description 启用时间 */
    enableTime() {
      const flow = () => {
        //由于authStore里面也使用了当前store，只能通过这种方式使用user_data
        const { user_data } = storeToRefs($authStore);

        checkSign(user_data.value);
        checkDoubleCard(user_data.value);

        $markerStore.addMarkerNum("nx46", 5);
      };
      flow();
      timer = setInterval(flow, 5000);
    },

    /** @description 中断时间 */
    interrupt() {
      clearInterval(timer);
    },
  };
  return {
    ...ExposeMethods,
  };
});

export { TimeStore };
