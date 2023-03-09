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
      let timer: Interval;
      let num = 0, //用于累加遍历字符串
        text = ""; //用于输出在屏幕上
      fn();
      function fn() {
        timer = setInterval(() => {
          if (num >= say.length) {
            //如果文字输出完毕
            clearInterval(timer); //清除用于输出文字的计时器
            binding.value && binding.value();
            return;
          }
          text += say[num]; //遍历输出的文字
          el.innerHTML = text; //输出在屏幕上
          num++;
        }, 50);
      }
    }, 750);
  },
};

export default typewriterMultiple;
