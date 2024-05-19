import { $bus } from "./eventBus";

let loadingCount = 0;
let closeTimer: NodeJS.Timeout | undefined;
let openTimer: NodeJS.Timeout | undefined;

/** @description 开启loading
 * @param text loading文字
 */
const show = (text: string) => {
  //延迟显示loading，避免出现加载速度太快loading一闪而过
  openTimer = setTimeout(() => {
    //如果loading在延迟关闭之前再次被调用，则清除关闭定时器
    if (closeTimer) clearTimeout(closeTimer);

    if (loadingCount === 0) {
      $bus.emit("loading", {
        show: true,
        text,
      });
    }

    loadingCount++;
  }, 250);
};

/** @description 关闭loading */
const close = () => {
  return new Promise<void>((resolve) => {
    //解决loading加载速度太快loading一闪而过
    clearTimeout(openTimer);

    //只有在大于0的时候减少，避免出现负数
    if (loadingCount > 0) {
      loadingCount--;
    }

    //只有当所有loading结束后才能隐藏loading
    if (loadingCount === 0) {
      //延迟关闭loading，避免出现请求结束后立即执行下一个请求出现闪现
      closeTimer = setTimeout(() => {
        $bus.emit("loading", { show: false });
        closeTimer = undefined;
        resolve();
      }, 500);
    }
  });
};

export const $loading = {
  show,
  close,
};
