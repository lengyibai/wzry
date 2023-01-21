import { defineStore } from "pinia";
import { ref } from "vue";

const otherStore = defineStore("other", () => {
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

  /** @description: 折叠触发后触发 */
  const setTriggerFn = (fn: () => void) => {
    triggerFn.value.push(fn);
  };

  /** @description: 清空触发函数 */
  const clearTrigger = () => {
    triggerFn.value = [];
  };

  return { collapse, setCollapse, setTriggerFn, clearTrigger };
});

export default otherStore;
export type OtherStore = ReturnType<typeof otherStore>;
