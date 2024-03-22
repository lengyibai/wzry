/**
 * v-blur-load
 * 模糊加载图片
 */
import type { Directive, DirectiveBinding } from "vue";

import { _getImgLink } from "@/utils/concise";

interface ElType extends HTMLImageElement {
  /** 原始动画 */
  _transition: string;
  /** 更新数据 */
  _loadImage: (v: DirectiveBinding<string>) => void;
}

const vBlurLoad: Directive<ElType, string> = {
  mounted(el, binding) {
    let retryCount = 0;
    let readyDataResolve: any;
    const readPromise = new Promise((resolve) => (readyDataResolve = resolve));

    //当模糊图片完成加载，则可加载大图
    el.onload = readyDataResolve;
    el.onerror = readyDataResolve;

    el._transition = el.style.transition;
    el.style.transition = "0s";
    el.style.filter = "blur(var(--blur-image-load))";

    const coverImg = new Image();

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          await readPromise;

          /* 移除模糊 */
          const removeBlur = () => {
            el.style.filter = "blur(0)";
            setTimeout(() => {
              el.style.filter = "";
              el.style.transition = el._transition;
            }, 500);
          };

          /* 用于加载失败重试 */
          const loadImg = () => {
            //当大图加载完毕后将模糊图片替换成大图，并设置过度动画
            coverImg.src = binding.value;
            coverImg.onload = () => {
              el.src = binding.value;
              el.style.transition = "0.5s";

              //当大图替换完毕后去掉模糊滤镜
              el.onload = removeBlur;
            };

            coverImg.onerror = () => {
              retryCount++;
              if (retryCount < 3) {
                setTimeout(loadImg, 1000);
              } else {
                el.src = _getImgLink("unknown", "2");
                removeBlur();
              }
            };
          };
          loadImg();
        }
      });
    });

    observer.observe(el);
  },
};

export { vBlurLoad };
