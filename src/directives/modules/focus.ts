/**
 * v-focus
 * 自动获取焦点
 */
import type { Directive } from "vue";

const focus: Directive = {
  mounted(el: HTMLElement) {
    setTimeout(() => {
      el.focus();
    });
  },
};

export default focus;
