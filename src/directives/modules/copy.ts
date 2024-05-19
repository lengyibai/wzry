/**
 * v-copy
 * 复制传递的值
 */
import type { Directive } from "vue";

import { MESSAGE_TIP } from "@/config";
import { $message } from "@/utils/busTransfer";

const vCopy: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    el.onclick = () => {
      const textarea = document.createElement("textarea");
      textarea.value = binding.value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      $message(MESSAGE_TIP.ds85);
    };
  },
};

export { vCopy };
