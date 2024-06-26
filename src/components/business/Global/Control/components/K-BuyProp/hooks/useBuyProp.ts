import { ref } from "vue";

import type { BuyProp } from "../interface";

const ExposeData = {
  /** 是否显示 */
  show: ref(false),
  /** 接收的配置 */
  config: ref<BuyProp>(),
};
const { show, config } = ExposeData;

/** @description 购买道具 */
const useBuyProp = () => {
  const ExposeMethods = {
    /**
     * @description 显示购买道具弹窗
     * @param 购买道具参数
     */
    openBuyProp(v: BuyProp) {
      show.value = true;
      config.value = v;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useBuyProp };
