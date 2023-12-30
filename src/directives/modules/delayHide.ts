/**
 * v-delayHide
 * 鼠标离开元素延迟隐藏
 */
import type { Directive } from "vue";

interface Params {
  /** 鼠标进入元素时触发 */
  _enter: () => void;
  /** 鼠标离开元素时触发 */
  _leave: () => void;
}

const vDelayHide: Directive<HTMLElement, Params> = {
  mounted(el, binding) {
    const { _enter, _leave } = binding.value;
    let timer: NodeJS.Timeout;
    el.addEventListener("mouseleave", () => {
      timer = setTimeout(_leave, 1000);
    });

    el.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      _enter();
    });
  },
};

export { vDelayHide };
