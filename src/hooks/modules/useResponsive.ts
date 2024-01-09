import { ref } from "vue";

const ExposeData = {
  /** 低于960px */
  under_960: ref(false),
  /** 低于1200px */
  under_1200: ref(false),
};
const { under_960, under_1200 } = ExposeData;

const change = () => {
  const w = window.innerWidth;

  under_960.value = w < 960;
  under_1200.value = w < 1200;
};
change();
window.addEventListener("resize", change);

/** @description 响应式条件 */
const useResponsive = () => {
  return ExposeData;
};

export { useResponsive };
