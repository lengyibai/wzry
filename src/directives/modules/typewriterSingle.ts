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
      let num = 0; //用于累加遍历字符串
      let text = ""; //用于输出在屏幕上
      lyb.innerHTML = "";
      const timer = setInterval(() => {
        if (num >= say.length) {
          //如果文字输出完毕
          clearInterval(timer); //清除用于输出文字的计时器
          binding.value && binding.value();
          return;
        }
        text += say[num]; //遍历输出的文字
        lyb.innerHTML = text; //输出在屏幕上
        num++;
      }, 150);
    }
    setTimeout(() => {
      again();
    }, 750);
  },
};

export default typewriterSingle;
