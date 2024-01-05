/**
 * v-mouse-tip
 * 鼠标悬浮提示，配合K-MouseTip使用
 */

import type { Directive } from "vue";

import { $bus } from "@/utils";

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
  text: string;
  /** 是否处于禁用状态 */
  disabled?: boolean;
  /** 当前悬浮类型 */
  type?: "NORMAL" | "INPUT";
}

const vMouseTip: Directive<ElType, Params> = {
  mounted(el, binding) {
    const { text, disabled, type } = binding.value || {};

    el._text = text;
    el._disabled = !!disabled;
    el.addEventListener("mouseenter", () => {
      el._show = true;
      $bus.emit("mouse-tip", {
        show: true,
        text: el._text,
        disable: el._disabled,
        type,
      });
    });

    el.addEventListener("mouseleave", () => {
      el._show = false;
      $bus.emit("mouse-tip", {
        show: false,
      });
    });
  },
  updated(el, binding) {
    const { text, disabled, type } = binding.value || {};
    if (el._text === text) return;
    el._text = text;
    el._disabled = !!disabled;
    if (!(el._text && el._show)) return;

    $bus.emit("mouse-tip", {
      show: true,
      text: el._text,
      disable: disabled,
      type,
    });
  },
  unmounted(el) {
    if (!el._show) return;
    $bus.emit("mouse-tip", {
      show: false,
    });
  },
};

export { vMouseTip };
