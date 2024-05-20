/**
 * v-debounce-click
 * 防抖点击，点击后会立即触发，接下来一秒内的点击会被忽略
 */
import type { Directive } from "vue";

import { _debounce } from "@/utils/tool";

const vDebounceClick: Directive<HTMLInputElement, () => void> = {
  mounted(el, binding) {
    const debounceClick = _debounce(binding.value, 1000, {
      leading: true,
      trailing: false,
    });

    el.addEventListener("click", debounceClick);
  },
};

export { vDebounceClick };
