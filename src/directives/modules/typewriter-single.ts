/**
 * v-typewriter-single
 * 单行打字机
 * 注：只能使用v-html填充内容，否则会使用上一次的文本
 */

import type { Directive, DirectiveBinding } from "vue";

interface ElType extends HTMLElement {
  /** 开始输出 */
  _startOutput: (el: ElType, v: DirectiveBinding<Params>) => void;
}

interface Params {
  /** 打字结束后触发 */
  callback?: () => void;
  /** 频率 ms/字 */
  speed?: number;
  /** 延迟多少毫秒触发 */
  delay?: number;
}

const vTypewriterSingle: Directive<ElType, Params> = {
  mounted(el, binding) {
    el._startOutput = (el, binding) => {
      const { callback, speed = 150, delay = 750 } = binding.value || {};

      const lyb = el;
      const say = lyb.innerHTML;
      lyb.innerHTML = "";
      function again() {
        /** 用于累加遍历字符串 */
        let num = 0;
        /** 用于输出在屏幕上 */
        let text = "";
        lyb.innerHTML = "";
        const timer = setInterval(() => {
          if (num >= say.length) {
            clearInterval(timer);
            callback && callback();
            return;
          }
          text += say[num];
          lyb.innerHTML = text;
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
    el._startOutput(el, binding);
  },
};

export { vTypewriterSingle };
