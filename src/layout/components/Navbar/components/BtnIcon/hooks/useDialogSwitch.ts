import { ref } from "vue";

const ExposeData = {
  /** 是否显示活动页 */
  show_activity: ref(false),
};
const { show_activity } = ExposeData;

/** @description 弹窗开关 */
const useDialogSwitch = () => {
  const ExposeMethods = {
    setActivityShow(status: boolean) {
      show_activity.value = status;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useDialogSwitch };
