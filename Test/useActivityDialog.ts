import { API_USER } from "@/api/modules/user";
import { Util } from "@/utils";

const activity_list = {
  211: {
    key: "activity211Info",
    eventName: "sign-in",
    show() {
      Util.$Bus.emit("sign-in");
    },
  },
  212: {
    key: "activity212Info",
    eventName: "month-week-card",
    show() {
      Util.$Bus.emit("month-week-card");
    },
  },
} as const;

/** 每个活动关闭时调用钩子，显示下一个活动 */
let _resolve: (value: void) => void;

/** @description 非活动海报弹窗 */
const useCustomActivity = () => {
  const simulateActivity = async (id: number, activityFn: () => Promise<any>) => {
    let status = false;
    const res = await activityFn();
    status = res.data.data[activity_list[id].key].status;
    if (status) {
      Util.$Bus.emit(activity_list[id].eventName);
      await new Promise((resolve) => (_resolve = resolve));
    }
  };
  const ExposeMethods = {
    /** @description 开始显示活动弹窗 */
    async runActivities() {
      await simulateActivity(211, API_USER.SignInInfo);
      await simulateActivity(212, API_USER.WeekMonthCardInfo);
    },

    /** @description 活动被关闭时调用 */
    closeActivity() {
      _resolve?.();
    },

    /** @description 退出登录是强制关闭活动 */
    closeAll() {
      _resolve?.();
      Util.$Bus.emit("close-all-activity");
    },
  };
  return { ...ExposeMethods };
};
export { useCustomActivity };
