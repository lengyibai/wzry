/**
 * v-typewriterMultiple
 * 多行打字机
 */
import type { Directive } from "vue";

const vTypewriterMultiple: Directive<HTMLElement, () => void> = {
  mounted(el, binding) {
    const say = el.innerHTML;
    el.innerHTML = "";
    setTimeout(() => {
      let timer: NodeJS.Timeout;
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
        }, 100);
      }
    }, 750);
  },
};

export { vTypewriterMultiple };
