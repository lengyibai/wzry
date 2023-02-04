import { defineStore } from "pinia";
import { ref } from "vue";

/** @description 折叠侧边栏 */
const collapseStore = defineStore("collapse", () => {
  const collapse = ref(false); //折叠

  /* 如果浏览器宽度低于高度，则自动折叠 */
  collapse.value = window.innerWidth < window.innerHeight;
  window.addEventListener("resize", () => {
    collapse.value = window.innerWidth < window.innerHeight;
  });

  /** @description 控制折叠 */
  const setCollapse = () => {
    collapse.value = !collapse.value;
  };

  return {
    /** 折叠状态 */
    collapse,
    setCollapse,
  };
});

export default collapseStore;
export type CollapseStore = ReturnType<typeof collapseStore>;
