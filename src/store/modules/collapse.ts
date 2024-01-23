import { defineStore } from "pinia";
import { watch } from "vue";
import { ref } from "vue";

import { $bus } from "@/utils";

/** @description 折叠侧边栏 */
const CollapseStore = defineStore("collapse", () => {
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

    /** @description 控制折叠 */
    setCollapse(v: boolean) {
      collapse.value = v;
    },
  };

  /* 如果浏览器宽度低于高度，则自动折叠 */
  collapse.value = window.innerWidth < 960;

  watch(collapse, () => {
    $bus.emit("update-waterfall");
  });

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { CollapseStore };
