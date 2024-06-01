/**
 * v-scroll-virtualization
 * 滚动列表顶部和底部虚化
 */
import type { Directive } from "vue";

interface ElType extends HTMLElement {
  _observer: MutationObserver;
}

const vScrollVirtualization: Directive<ElType, boolean> = {
  mounted(el, binding) {
    if (binding.value === false) return;
    //当前可滚动距离
    const scroll_height = el.scrollHeight - el.clientHeight;
    if (scroll_height > 10) {
      el.style.mask = "linear-gradient(180deg, #000 95%, transparent 100%)";
    }

    el.addEventListener("scroll", () => {
      //当前可滚动距离
      const scroll_height = el.scrollHeight - el.clientHeight;

      //如果可滚动距离低于10，则不设置遮罩
      if (scroll_height < 10) return;

      //如果已经滚动10像素，并且距离底部还有一段距离，则设置上下遮罩
      if (el.scrollTop > 10 && el.scrollTop < scroll_height - 10) {
        el.style.mask =
          "linear-gradient(180deg, transparent 0%, #000 5%, #000 95%, transparent 100%)";
        return;
      }

      //如果已经滚动的距离低于10像素，则只设置底部遮罩
      if (el.scrollTop < 10) {
        el.style.mask = "linear-gradient(180deg, #000 95%, transparent 100%)";
        return;
      }

      //当滚动到接近底部时，只设置顶部遮罩
      if (el.scrollTop > scroll_height - 10) {
        el.style.mask = "linear-gradient(180deg, transparent 0%, #000 5%, #000 95%)";
      }
    });

    //监听子元素变化
    const observer = new MutationObserver(() => {
      //当子元素为空时，清除虚化
      if (el.scrollHeight === el.clientHeight) {
        el.style.mask = "";
      }
    });

    observer.observe(el, { childList: true, subtree: true });

    // 将observer存储在元素的自定义属性中，以便在卸载时可以访问
    el._observer = observer;
  },

  unmounted(el) {
    el._observer && el._observer.disconnect();
  },
};

export { vScrollVirtualization };
