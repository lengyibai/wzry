import { ref, watch } from "vue";

import { $bus } from "@/utils/eventBus";

const ExposeData = {
  /** 折叠 */
  collapse: ref(false),
};
const { collapse } = ExposeData;

const ExposeMethods = {
  /** @description 切换折叠 */
  toggleCollapse() {
    collapse.value = !collapse.value;
  },

  /** @description 控制折叠
   * @param v 折叠状态
   */
  setCollapse(v: boolean) {
    collapse.value = v;
  },
};

//如果浏览器宽度低于高度，则自动折叠
collapse.value = window.innerWidth < 960;

/** @description 侧边栏折叠 */
const useCollapse = () => {
  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

watch(collapse, () => {
  $bus.emit("update-waterfall");
});

export { useCollapse };
