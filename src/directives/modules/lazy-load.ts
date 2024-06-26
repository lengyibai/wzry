/**
 * v-lazy-load
 * 当图片在可视区停留250ms才会加载
 */
import type { Directive } from "vue";

import { _getMiscLink } from "@/utils/concise";
import { _loadAndRetryImage } from "@/utils/tool";

interface Params {
  /** 图片地址 */
  link: string;
  /** 图片加载成功回调 */
  finish?: () => void;
}

const vLazyLoad: Directive<HTMLImageElement, Params> = {
  mounted(el, binding) {
    const { link, finish } = binding.value;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          _loadAndRetryImage(link)
            .then(() => {
              el.src = link;
            })
            .catch(() => {
              el.src = _getMiscLink("unknown");
            })
            .finally(() => {
              finish && finish();
            });
        }
      });
    });

    observer.observe(el);
  },
};

export { vLazyLoad };
