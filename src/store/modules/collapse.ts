import { defineStore } from "pinia";
import { watch } from "vue";
import { ref } from "vue";

import { $bus } from "@/utils";

/** @description 折叠侧边栏 */
const CollapseStore = defineStore("collapse", () => {
  /** 折叠 */
  const collapse = ref(false);

  /* 如果浏览器宽度低于高度，则自动折叠 */
  collapse.value = window.innerWidth < 960;

  /** @description 切换折叠 */
  const toggleCollapse = () => {
    collapse.value = !collapse.value;
  };

  /** @description 控制折叠 */
  const setCollapse = (v: boolean) => {
    collapse.value = v;
  };

  watch(collapse, () => {
    $bus.emit("update-waterfall");
  });

  return {
    /** 折叠状态 */
    collapse,
    toggleCollapse,
    setCollapse,
  };
});

export { CollapseStore };
