import { onActivated, onDeactivated, onMounted, onScopeDispose, ref } from "vue";

import { _debounce } from "@/utils/tool";

/** @description 根据宽度区间改变列表行个数
 * @param maxIntervalNum 超出区间时的个数
 * @param intervalNums 区间列表
 */
const useChangeListLineNum = (maxIntervalNum: number, intervalNums: [number, number][]) => {
  const ExposeData = {
    /** 一行显示的数目 */
    line_num: ref(0),
  };
  const { line_num } = ExposeData;

  /** @description 实时修改一行个数 */
  const debounceChangeCount = _debounce(() => {
    const v = window.innerWidth;

    if (v >= intervalNums[0][0]) {
      line_num.value = maxIntervalNum;
    }

    for (const [interval, num] of intervalNums) {
      if (v < interval) {
        line_num.value = num;
      }
    }
  }, 100);

  onMounted(() => {
    debounceChangeCount();
    window.addEventListener("resize", debounceChangeCount);
  });

  onActivated(() => {
    debounceChangeCount();
    window.addEventListener("resize", debounceChangeCount);
  });

  onDeactivated(() => {
    window.removeEventListener("resize", debounceChangeCount);
  });

  onScopeDispose(() => {
    window.removeEventListener("resize", debounceChangeCount);
  });

  return {
    ...ExposeData,
  };
};

export { useChangeListLineNum };
