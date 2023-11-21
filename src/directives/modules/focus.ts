/**
 * v-focus
 * 自动获取焦点
 */
import type { Directive } from "vue";

const vFocus: Directive<HTMLInputElement> = {
  mounted(el) {
    setTimeout(() => {
      el.focus();
    });
  },
};

export { vFocus };
