/**
 * v-blurLoad
 * 模糊加载图片
 */
import type { Directive } from "vue";

const vBlurLoad: Directive<HTMLImageElement, string> = {
  mounted(el, binding) {
    const coverImg = new Image();

    const finishLoadBlur = () => {
      coverImg.src = binding.value;

      const finishLoadBig = () => {
        el.src = binding.value;

        el.onload = () => {
          el.classList.remove("blur");
        };
      };

      coverImg.onload = finishLoadBig;
    };

    el.onload = finishLoadBlur;
    el.onerror = finishLoadBlur;
  },
};

export { vBlurLoad };
