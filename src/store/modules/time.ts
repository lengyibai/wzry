import { defineStore, storeToRefs } from "pinia";

import { KnapsackStore } from "./knapsack";
import { MailStore } from "./mail";
import { SupplyStore } from "./supply";
import { AuthStore } from "./auth";
import { TaskStore } from "./task";

import { _checkTimeStamp, dayjs } from "@/utils/tool";
import { $message } from "@/utils/busTransfer";
import { MESSAGE_TIP } from "@/config";
import { useSetMarker, useWeekCard } from "@/hooks";

/** @description 新的一天处理事务 */
const TimeStore = defineStore("time", () => {
  const $taskStore = TaskStore();
  const $mailStore = MailStore();
  const $supplyStore = SupplyStore();
  const $authStore = AuthStore();
  const $knapsackStore = KnapsackStore();

  const { addStatusMarkerNum } = useSetMarker();

  let timer: NodeJS.Timeout;
  /** 每一分钟重置一次 */
  let minute = 0;

  /** @description 当时间为第二天的时候执行 */
  const newDay = () => {
    //新的一天需要重新设置上次登录时间，避免刷新页面后再次判断为新的一天
    $authStore.updateUserData({
      lastLoginTime: dayjs().valueOf(),
    });

    $message(MESSAGE_TIP.xu03);
    $mailStore.sign();
    $supplyStore.sign();
    $taskStore.resetDayWeekTask("DAY");
    $taskStore.setTaskStatus("week_login_day", 1);
    $knapsackStore.clearCoin();
    addStatusMarkerNum("VISIT_DAY");

    useWeekCard();
  };

  /** @description 当时间为周一的时候执行 */
  const newWeek = () => {
    $taskStore.resetDayWeekTask("WEEK");
  };

  /**
   * @description 实时签到判断
   * @param user_data 用户数据
   */
  const checkSign = (user_data: User.Data) => {
    //是否已经是新的一天
    const new_day = _checkTimeStamp(user_data.lastLoginTime, "day") === 1;
    //是否已经是新的一周
    const new_week = _checkTimeStamp(user_data.lastLoginTime, "week") === 1;

    if (new_day) newDay();
    if (new_week) newWeek();
  };

  /**
   * @description 实时双倍卡判断
   * @param user_data 用户数据
   */
  const checkDoubleCard = (user_data: User.Data) => {
    const keys = ["doubleGoldCardExpireTime", "doubleExpCardExpireTime"] as const;
    keys.forEach((item) => {
      //如果过期则重置
      if (user_data[item] !== 0 && user_data[item] < dayjs().valueOf()) {
        $authStore.updateUserData({
          [item]: 0,
        });

        let prop_name = "";
        if (item === "doubleGoldCardExpireTime") {
          prop_name = "金币双倍卡";
        } else {
          prop_name = "经验双倍卡";
        }

        $mailStore.sendMsgMail({
          title: "双倍卡过期提醒",
          desc: `你的${prop_name}已过期，快去开卡吧！`,
        });
      }
    });
  };

  const ExposeMethods = {
    /** @description 启用时间 */
    enableTime() {
      const flow = () => {
        const { user_data } = storeToRefs($authStore);

        minute += 5;
        if (minute >= 60) {
          minute = 0;
          $taskStore.setTaskStatus("today_online_duration", 1);
          $taskStore.setTaskStatus("week_online_duration", 1);
        }

        addStatusMarkerNum("ONLINE_TIME", 5);
        checkSign(user_data.value);
        checkDoubleCard(user_data.value);
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
