import { defineStore } from "pinia";
import { ref } from "vue";

const otherStore = defineStore("collapse", () => {
  const collapse = ref(false); //折叠
  const triggerFn = ref<(() => void)[]>([]);

  /** @description: 控制折叠 */
  const setCollapse = () => {
    collapse.value = !collapse.value;
    setTimeout(() => {
      triggerFn.value.forEach((item) => {
        item();
      });
    }, 500);
  };

  /** @description: 设置折叠触发后触发的函数 */
  const setTriggerFn = (fn: () => void) => {
    triggerFn.value.push(fn);
  };

  /** @description: 清空触发函数 */
  const clearTrigger = () => {
    triggerFn.value = [];
  };

  window.addEventListener("resize", (e) => {
    const el = e.target as Window;
    collapse.value = el.innerWidth < 1300;
  });

  return { collapse, setCollapse, setTriggerFn, clearTrigger };
});

export default otherStore;
export type OtherStore = ReturnType<typeof otherStore>;
