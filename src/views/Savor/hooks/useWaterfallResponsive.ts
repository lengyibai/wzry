import { Ref } from "vue";
import { ref, onMounted } from "vue";
import { onScopeDispose } from "vue";
import _ from "lodash";

import { $bus } from "@/utils";

/** @description 瀑布流响应式相关 */
const useWaterfallResponsive = (waterfallRef: Ref<any>) => {
  /** 一行个数 */
  const count = ref(2);

  const setCount = () => {
    const w = window.innerWidth;

    if (w >= 1500) {
      count.value = 5;
    } else if (w >= 1000) {
      count.value = 4;
    } else if (w >= 500) {
      count.value = 3;
    } else if (w < 500) {
      count.value = 2;
    }

    waterfallRef.value?.updateLoad();
  };

  onMounted(() => {
    setTimeout(() => {
      setCount();
    });
  });

  const debounceSetCount = _.debounce(setCount, 500);
  $bus.on("resize", debounceSetCount);

  onScopeDispose(() => {
    $bus.off("resize");
  });

  return {
    /** 一行个数 */
    count,
  };
};

export { useWaterfallResponsive };
