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
  _loadImage: (v: DirectiveBinding<Params>) => void;
}

interface Params {
  /** 大图地址 */
  link: string;
  /** 加载完成回调 */
  finish: () => void;
  /** 加载失败回调 */
  error: () => void;
}

const vBlurLoad: Directive<ElType, Params> = {
  mounted(el, binding) {
    el._loadImage = (binding) => {
      const { link, finish, error } = binding.value;
      //当传递的大图地址与上一张大图地址相同时，则直接使用
      if (el._last_image === link) {
        el.src = link;
        return;
      }
      el._last_image = link;
      el._transition = el.style.transition;
      const coverImg = new Image();
      el.style.transition = "0s";
      el.style.filter = "blur(var(--image-load-blur))";

      const finishLoadBlur = () => {
        coverImg.src = link;

        //当大图加载完毕后将模糊图片替换成大图，并设置过度动画
        coverImg.onload = () => {
          el.src = link;
          el.style.transition = "0.5s";

          //当大图替换完毕后去掉模糊滤镜
          el.onload = () => {
            el.style.filter = "blur(0)";
            finish();
            setTimeout(() => {
              el.style.transition = el._transition;
            }, 500);
          };
        };

        coverImg.onerror = error;
      };

      //当模糊图片加载完成后加载大图
      el.onload = finishLoadBlur;
      //当模糊图片加载失败后直接加载大图
      el.onerror = finishLoadBlur;
    };
    el._loadImage(binding);
  },
  updated(el, binding) {
    el._loadImage(binding);
  },
};

export { vBlurLoad };
