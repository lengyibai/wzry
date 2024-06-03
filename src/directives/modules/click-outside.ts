/**
 * v-click-outside
 * 点击元素外面时触发
 */
import type { Directive } from "vue";

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

/**
 * @description 递归判断是否点击的父容器的元素
 * @param el 容器元素
 * @param clickEl 点击的元素
 */
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
