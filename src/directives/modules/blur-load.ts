/**
 * v-blur-load
 * 图片先加载模糊图，再加载大图
 */

import type { Directive, DirectiveBinding } from "vue";

import { _getMiscLink } from "@/utils/concise";

// 指令参数接口
interface Params {
  /** 大图 */
  img: string;
  /** 加载成功回调 */
  onSuccess?: () => void;
  /** 加载失败回调 */
  onError?: () => void;
}

// HTML图片元素类型扩展接口，包含自定义属性和方法
interface ElType extends HTMLImageElement {
  /** 原始过渡动画 */
  _transition: string;
  /** 更新加载图片 */
  _loadImage: (v: DirectiveBinding<string>) => void;
}

const vBlurLoad: Directive<ElType, Params> = {
  mounted(el, binding) {
    /** 失败重连次数 */
    let retryCount = 0;
    /** 图片加载结束后调用，不管是否成功 */
    let readyDataResolve: any;
    const readPromise = new Promise((resolve) => (readyDataResolve = resolve));

    // 当模糊图片完成加载或加载失败时，触发Promise的resolve
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

          /* 移除模糊效果 */
          const removeBlur = () => {
            el.style.filter = "blur(0)";
            setTimeout(() => {
              el.style.filter = "";
              el.style.transition = el._transition;
            }, 500);
          };

          /* 加载图片函数 */
          const loadImg = () => {
            // 当大图加载完成后，替换模糊图片并设置过渡动画
            coverImg.src = binding.value.img;
            coverImg.onload = () => {
              el.src = binding.value.img;
              el.style.transition = "0.5s";

              // 当大图替换完成后，移除模糊效果
              el.onload = removeBlur;
              binding.value.onSuccess?.();
            };

            // 当大图加载失败时，进行重试
            coverImg.onerror = () => {
              retryCount++;
              if (retryCount < 3) {
                setTimeout(loadImg, 1000);
              } else {
                // 若重试次数超过3次，则显示未知图片并移除模糊效果
                el.src = _getMiscLink("unknown");
                removeBlur();
                binding.value.onError?.();
              }
            };
          };
          loadImg();
        }
      });
    });

    // 开始观察目标元素
    observer.observe(el);
  },
};

export { vBlurLoad };
