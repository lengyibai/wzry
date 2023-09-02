/**
 * v-typewriterMultiple
 * 多行打字机
 */
import type { Directive, DirectiveBinding } from "vue";

const typewriterMultiple: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const say = el.innerHTML;
    el.innerHTML = "";
    setTimeout(() => {
      let timer: NodeJS.Timer;
      /** 用于累加遍历字符串 */
      let num = 0,
        /** 用于输出在屏幕上 */
        text = "";
      fn();
      function fn() {
        timer = setInterval(() => {
          if (num >= say.length) {
            clearInterval(timer);
            binding.value && binding.value();
            return;
          }
          text += say[num];
          el.innerHTML = text;
          num++;
        }, 50);
      }
    }, 750);
  },
};

export default typewriterMultiple;
