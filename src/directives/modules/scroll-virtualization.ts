/**
 * v-scroll-virtualization
 * 滚动列表顶部和底部虚化
 */
import type { Directive } from "vue";

const vScrollVirtualization: Directive<HTMLElement> = {
  mounted(el) {
    el.style.mask = "linear-gradient(180deg, #000 95%, transparent 100%)";
    el.addEventListener("scroll", () => {
      if (el.scrollTop > 10) {
        el.style.mask =
          "linear-gradient(180deg, transparent 0%, #000 5%, #000 95%, transparent 100%)";
      }

      if (el.scrollTop < 10) {
        el.style.mask = "linear-gradient(180deg, #000 95%, transparent 100%)";
      }

      if (el.scrollTop > el.scrollHeight - el.clientHeight - 10) {
        el.style.mask = "linear-gradient(180deg, transparent 0%, #000 5%, #000 95%)";
      }
    });
  },
};

export { vScrollVirtualization };
