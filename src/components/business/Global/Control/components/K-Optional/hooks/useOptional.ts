import { ref } from "vue";

import type { OptionalMode } from "../interface";

const ExposeData = {
  /** 是否显示弹窗 */
  show: ref(false),
  /** 弹窗模式 */
  mode: ref<OptionalMode>("HERO"),
};
const { show, mode } = ExposeData;

/** @description 自选英雄/皮肤 */
const useOptional = () => {
  const ExposeMethods = {
    /** @description 显示弹窗 */
    openOptional(v: OptionalMode) {
      mode.value = v;
      show.value = true;
    },

    /** @description 关闭弹窗 */
    closeOptional() {
      show.value = false;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useOptional };
