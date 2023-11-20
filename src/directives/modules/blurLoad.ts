/**
 * v-blurLoad
 * 模糊加载图片
 */
import type { Directive, DirectiveBinding } from "vue";

const blurLoad: Directive = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding<string>) {
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

export default blurLoad;
