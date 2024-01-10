/**
 * v-click-outside
 * 自动获取焦点
 */
import type { Directive } from "vue";

import { $tool } from "@/utils";

interface ElType extends HTMLElement {
  /** 上一次的状态 */
  _last_status: boolean;
  /** 点击时触发的函数 */
  _clickFn: (e: Event) => void;
}

interface Params {
  /** 点击里面 */
  inset: () => void;
  /** 点击外面 */
  outside: () => void;
}

/** 递归对比元素的祖先元素是否与指定元素相同 */
const classNameInclude = (el: HTMLElement, clickEl: HTMLElement): boolean => {
  if (el === clickEl) return true;
  if (clickEl.parentElement) return classNameInclude(el, clickEl.parentElement);
  return false;
};

const vClickOutside: Directive<ElType, Params> = {
  mounted(el, binding) {
    const { inset, outside } = binding.value;
    el._clickFn = (e: Event) => {
      const click_el = e.target as HTMLElement;
      const is_inside = classNameInclude(el, click_el);

      if (is_inside) {
        if (el._last_status) {
          el._last_status = false;
          outside();
        } else {
          el._last_status = true;
          inset();
        }
      } else {
        if (el._last_status) {
          el._last_status = false;
          outside();
        }
      }
    };

    window.addEventListener("click", el._clickFn);
  },
  unmounted(el) {
    window.removeEventListener("click", el._clickFn);
  },
};

export { vClickOutside };
