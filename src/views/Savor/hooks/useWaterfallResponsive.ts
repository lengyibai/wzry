import { ref, onMounted } from "vue";
import { onScopeDispose } from "vue";

/** @description 瀑布流响应式相关 */
const useWaterfallResponsive = (updatePosition: () => void) => {
  const ExposeData = {
    /** 一行个数 */
    count: ref(2),
  };
  const { count } = ExposeData;

  /** @description 设置一行数量 */
  const setCount = () => {
    const w = window.innerWidth;

    if (w >= 3000) {
      count.value = 8;
    } else if (w >= 2500) {
      count.value = 7;
    } else if (w >= 2000) {
      count.value = 6;
    } else if (w >= 1500) {
      count.value = 5;
    } else if (w >= 1000) {
      count.value = 4;
    } else if (w >= 500) {
      count.value = 3;
    } else if (w < 500) {
      count.value = 2;
    }

    updatePosition();
  };

  onMounted(() => {
    setCount();
  });

  window.addEventListener("resize", setCount);

  onScopeDispose(() => {
    window.removeEventListener("resize", setCount);
  });

  return {
    ...ExposeData,
  };
};

export { useWaterfallResponsive };
