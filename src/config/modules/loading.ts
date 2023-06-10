/* Loading防抖 */

import { Util } from "@/utils";

let loadingInterval: NodeJS.Timeout | null;
let needLoadingRequestCount = 0;

/** @description 开启loading */
const show = async (text: string) => {
  if (loadingInterval) clearTimeout(loadingInterval);

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
    loadingInterval = setTimeout(() => {
      Util.$Bus.emit("loading", { show: false, text: "" });
      loadingInterval = null;
    }, 500);
  }
};

export { show, close };
