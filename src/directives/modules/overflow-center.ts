/**
 * v-overflow-center
 * 容器可滚动时，内部靠上、靠左对齐，不可滚动时，居中对齐
 */
import type { Directive } from "vue";

const vOverflowCenter: Directive<HTMLElement> = {
  mounted(el) {
    const scroll_width = el.scrollWidth;
    const scroll_height = el.scrollHeight;
    const client_width = el.clientWidth;
    const client_height = el.clientHeight;

    if (scroll_width > client_width) {
      el.style.justifyContent = "flex-start";
    } else {
      el.style.justifyContent = "center";
    }

    if (scroll_height > client_height) {
      el.style.alignItems = "flex-start";
    } else {
      el.style.alignItems = "center";
    }
  },
};

export { vOverflowCenter };
