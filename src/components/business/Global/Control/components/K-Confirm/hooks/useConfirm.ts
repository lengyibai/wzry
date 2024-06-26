import { ref } from "vue";

import type { ConfirmTip } from "../interface";

import { usePlayAudio } from "@/hooks";

const ExposeData = {
  /** 是否显示 */
  show: ref(false),
  /** 接收的配置 */
  config: ref<ConfirmTip>({
    text: "",
    close: true,
    confirm() {},
    cancel() {},
  }),
};
const { show, config } = ExposeData;

/** @description 确认弹窗 */
const useConfirm = () => {
  const ExposeMethods = {
    /**
     * @description 显示确认提示弹窗
     * @param 确认参数
     */
    openConfirm(v: ConfirmTip) {
      show.value = true;
      config.value = v;
      usePlayAudio().playAudio("cy87");
      config.value.close = v.close === undefined ? true : v.close;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useConfirm };
