import { type Ref, onActivated, onDeactivated, onScopeDispose } from "vue";

/** @description 使用径向渐变实现window日历边框 */
const useRadialBorder = <T extends Ref<HTMLElement[] | undefined>>(els: T) => {
  /** @description 鼠标移动触发
   * @param event 鼠标事件对象
   */
  const handleMouseMove = (event: MouseEvent) => {
    els.value?.forEach((item) => {
      const { clientX, clientY } = event;
      const { top, left } = item.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      item.style.setProperty("--x", `${x}px`);
      item.style.setProperty("--y", `${y}px`);
    });
  };

  /** @description 重置位置 */
  const resetPosition = () => {
    els.value?.forEach((item) => {
      item.style.setProperty("--x", ``);
      item.style.setProperty("--y", ``);
    });
  };

  const ExposeMethods = {
    /** @description 开始监听 */
    enableRadialBorder() {
      resetPosition();
      window.removeEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousemove", handleMouseMove);
    },

    /** @description 禁用 */
    disableRadialBorder() {
      resetPosition();
      window.removeEventListener("mousemove", handleMouseMove);
    },
  };
  const { enableRadialBorder, disableRadialBorder } = ExposeMethods;

  enableRadialBorder();
  onActivated(enableRadialBorder);
  onDeactivated(disableRadialBorder);
  onScopeDispose(disableRadialBorder);

  return {
    ...ExposeMethods,
  };
};

export { useRadialBorder };
