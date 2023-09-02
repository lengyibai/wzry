/**
 * v-typewriterSingle
 * 单行打字机
 */
import type { Directive, DirectiveBinding } from "vue";

const typewriterSingle: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
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
          binding.value && binding.value();
          return;
        }
        text += say[num];
        lyb.innerHTML = text;
        num++;
      }, 150);
    }
    setTimeout(() => {
      again();
    }, 750);
  },
};

export default typewriterSingle;
