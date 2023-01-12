import { defineStore } from "pinia";
import { ref } from "vue";

const switchStore = defineStore("other", () => {
  const collapse = ref(false); //是否折叠
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

  return { collapse, setCollapse, setTriggerFn };
});

export default switchStore;
