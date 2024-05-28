import { ref } from "vue";

import { _debounce } from "@/utils/tool";

const ExposeData = {
  /** 低于960px */
  under_960: ref(false),
  /** 低于1200px */
  under_1200: ref(false),
};
const { under_960, under_1200 } = ExposeData;

/** @description 响应式触发 */
const debounceTrigger = _debounce(() => {
  const w = window.innerWidth;

  under_960.value = w < 960;
  under_1200.value = w < 1200;
}, 100);
debounceTrigger();

window.addEventListener("resize", debounceTrigger);

/** @description 响应式条件触发 */
const useResponsive = () => {
  return {
    ...ExposeData,
  };
};

export { useResponsive };
