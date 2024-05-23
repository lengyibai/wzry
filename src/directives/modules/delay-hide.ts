/**
 * v-delay-hide
 * 鼠标离开元素延迟隐藏
 */
import type { Directive } from "vue";

interface Params {
  /** 鼠标进入元素时触发 */
  enter: () => void;
  /** 鼠标离开元素时触发 */
  leave: () => void;
}

const vDelayHide: Directive<HTMLElement, Params> = {
  mounted(el, binding) {
    const { enter, leave } = binding.value;
    let timer: NodeJS.Timeout;

    el.addEventListener("mouseleave", () => {
      timer = setTimeout(leave, 500);
    });

    el.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      enter();
    });
  },
};

export { vDelayHide };
