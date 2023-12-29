/**
 * v-blurLoad
 * 模糊加载图片
 */
import type { Directive, DirectiveBinding } from "vue";

interface ElType extends HTMLImageElement {
  /** 原始动画 */
  _transition: string;
  /** 上一张图片 */
  _last_image: string;
  /** 更新数据 */
  _loadImage: (v: DirectiveBinding<string>) => void;
}

const vBlurLoad: Directive<ElType, string> = {
  mounted(el, binding) {
    el._last_image = binding.value;
    el._transition = el.style.transition;

    el._loadImage = (binding) => {
      const coverImg = new Image();
      el.style.transition = "0s";
      el.style.filter = "blur(var(--image-load-blur))";

      const finishLoadBlur = () => {
        coverImg.src = binding.value;

        //当大图加载完毕后将模糊图片替换成大图，并设置过度动画
        coverImg.onload = () => {
          el.src = binding.value;
          el.style.transition = "0.5s";

          //当大图替换完毕后去掉模糊滤镜
          el.onload = () => {
            el.style.filter = "blur(0)";
            setTimeout(() => {
              el.style.transition = el._transition;
            }, 500);
          };
        };
      };

      //当模糊图片加载完成后加载大图
      el.onload = finishLoadBlur;
      //当模糊图片加载失败后直接加载大图
      el.onerror = finishLoadBlur;
    };
    el._loadImage(binding);
  },
  updated(el, binding) {
    if (el._last_image === binding.value) return;
    el._loadImage(binding);
  },
};

export { vBlurLoad };
