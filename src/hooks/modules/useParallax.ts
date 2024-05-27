import { onScopeDispose } from "vue";

import { useDevice } from "./useDevice";

import { _isPhone, _throttle } from "@/utils/tool";

/** @description 鼠标视差动画
 * @param fn 鼠标移动时的回调函数
 */
const useParallax = (fn: (x: number, y: number) => void) => {
  const { browser_name } = useDevice();
  if (_isPhone || browser_name === "safari") return;
  const move = (e: MouseEvent | Touch) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = Number(((e.pageX - w / 2) / (w / 2)).toFixed(2));
    const y = Number(((e.pageY - h / 2) / (h / 2)).toFixed(2));
    fn(x, y);
  };

  const throttledMove = _throttle(move, 50);
  const handleEvent = (e: Event) => throttledMove(e as MouseEvent);

  window.addEventListener("mousemove", handleEvent);
  window.addEventListener("touchmove", handleEvent);

  onScopeDispose(() => {
    window.removeEventListener("mousemove", handleEvent);
    window.removeEventListener("touchmove", handleEvent);
  });
};

export { useParallax };
