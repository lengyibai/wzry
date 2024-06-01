/**
 * v-into-animate
 * 卡片入场动画
 */
import type { Directive } from "vue";

const vCardIntoAnimate: Directive<HTMLElement> = {
  mounted(el) {
    el.style.transitionDuration = "0.25s";
    el.style.opacity = "0";
    el.style.transform = "scale(0.5)";

    setTimeout(() => {
      el.style.opacity = "";
      el.style.transform = "";
    });
  },
};

export { vCardIntoAnimate };
