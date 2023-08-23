/* Loading防抖 */

import { Util } from "@/utils";

let loadingTimeout: NodeJS.Timeout | undefined;
let needLoadingRequestCount = 0;

/** @description 开启loading */
const show = async (text: string) => {
  if (loadingTimeout) clearTimeout(loadingTimeout);

  if (needLoadingRequestCount === 0) {
    Util.$Bus.emit("loading", {
      show: true,
      text,
    });
  }

  needLoadingRequestCount++;
};

/** @description 关闭loading */
const close = async () => {
  needLoadingRequestCount--;

  if (needLoadingRequestCount === 0) {
    loadingTimeout = setTimeout(() => {
      Util.$Bus.emit("loading", { show: false, text: "" });
      loadingTimeout = undefined;
    }, 500);
  }
};

export default { show, close };
