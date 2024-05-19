/**
 * v-typewriter-single
 * 单行打字机
 * 注：只能使用v-html填充内容，否则会使用上一次的文本
 */

import type { Directive, DirectiveBinding } from "vue";

interface ElType extends HTMLElement {
  /** 开始输出 */
  _startOutput: (el: ElType, v: DirectiveBinding<Params>) => void;
  /** 上一次打字内容 */
  _lastText: string;
}

interface Params {
  /** 频率 ms/字 */
  speed?: number;
  /** 延迟多少毫秒触发 */
  delay?: number;
  /** 打字结束后触发 */
  callback?: () => void;
}

const vTypewriterSingle: Directive<ElType, Params> = {
  mounted(el, binding) {
    el._startOutput = (el, binding) => {
      const { callback, speed = 150, delay = 750 } = binding.value || {};

      const say = el.innerHTML;
      el._lastText = el.innerHTML;
      el.innerHTML = "";
      function again() {
        /** 用于累加遍历字符串 */
        let num = 0;
        /** 用于输出在屏幕上 */
        let text = "";
        el.innerHTML = "";
        const timer = setInterval(() => {
          if (num >= say.length) {
            clearInterval(timer);
            callback && callback();
            return;
          }
          text += say[num];
          el.innerHTML = text;
          num++;
        }, speed);
      }
      setTimeout(() => {
        again();
      }, delay);
    };
    el._startOutput(el, binding);
  },

  updated(el, binding) {
    if (el._lastText === el.innerHTML) return;
    el._startOutput(el, binding);
  },
};

export { vTypewriterSingle };
