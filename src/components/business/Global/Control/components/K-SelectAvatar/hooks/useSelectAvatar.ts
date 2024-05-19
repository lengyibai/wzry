import { ref } from "vue";

const ExposeData = {
  /** 确定头像回调 */
  confirmCallback: ref<(base64: string) => void>(),
  /** 是否显示 */
  show: ref(false),
};
const { show, confirmCallback } = ExposeData;

/** @description 选择内置头像 */
const useSelectAvatar = () => {
  const ExposeMethods = {
    /** @description 显示弹窗 */
    openSelectAvatar(confirm: (base64: string) => void) {
      show.value = true;
      confirmCallback.value = confirm;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useSelectAvatar };
