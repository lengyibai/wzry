import { ref, onMounted } from "vue";
import { onScopeDispose } from "vue";
import _debounce from "lodash/debounce";

import { $bus } from "@/utils/eventBus";

/** @description 瀑布流响应式相关 */
const useWaterfallResponsive = () => {
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

    $bus.emit("update-waterfall");
  };

  onMounted(() => {
    setCount();
  });

  const debounceSetCount = _debounce(setCount, 250);
  window.addEventListener("resize", debounceSetCount);

  onScopeDispose(() => {
    window.removeEventListener("resize", debounceSetCount);
  });

  return {
    ...ExposeData,
  };
};

export { useWaterfallResponsive };
