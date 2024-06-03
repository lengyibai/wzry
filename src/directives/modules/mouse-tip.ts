/**
 * v-mouse-tip
 * 鼠标悬浮提示
 */

import type { Directive } from "vue";

import { $mouseTip } from "@/utils/busTransfer";
import type { MouseTip } from "@/components/business/Global/Control/components/K-MouseTip/interface";

interface ElType extends HTMLElement {
  /** tip内容 */
  _text: string;
  /** 是否处于显示中 */
  _show: boolean;
  /** 是否处于禁用状态 */
  _disabled: boolean;
}

interface Params {
  /** tip内容 */
  text?: string;
  /** 是否处于禁用状态 */
  disabled?: boolean;
  /** 当前悬浮类型 */
  type?: MouseTip["type"];
}

const vMouseTip: Directive<ElType, Params> = {
  mounted(el, binding) {
    const { text, disabled, type } = binding.value || {};

    el._text = text || "";
    el._disabled = !!disabled;
    const enterFn = () => {
      el._show = true;
      $mouseTip.show({
        text: el._text,
        disabled: el._disabled,
        type,
      });
    };
    el.addEventListener("mouseenter", enterFn);
    el.addEventListener("touchstart", enterFn);

    const leaveFn = () => {
      el._show = false;
      $mouseTip.close();
    };
    el.addEventListener("mouseleave", leaveFn);
    el.addEventListener("touchend", leaveFn);
  },

  updated(el, binding) {
    const { text, disabled, type } = binding.value || {};
    if (el._text === text) return;
    el._text = text || "";
    el._disabled = !!disabled;
    if (!(el._text && el._show)) return;

    $mouseTip.show({
      text: el._text,
      disabled: disabled,
      type,
    });
  },

  unmounted(el) {
    if (!el._show) return;
    $mouseTip.close();
  },
};

export { vMouseTip };
