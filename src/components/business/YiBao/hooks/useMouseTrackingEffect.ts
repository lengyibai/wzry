/** @description 鼠标移动时乂宝目光跟随
 * @param el 要跟随的元素
 * @param max 跟随元素移动最大范围
 * @param callback 移动时触发
 */
const useMouseTrackingEffect = (
  el: HTMLElement,
  max: number,
  callback: (el: HTMLElement, x: number, y: number) => void,
) => {
  const init = () => {
    let lock = false;
    let getElMoveValueX: (v: number) => number;
    let getElMoveValueY: (v: number) => number;

    return () => {
      //当el有值后将不再触发
      if (!lock && el) {
        lock = true;
        const el_rect = el.getBoundingClientRect();
        /** 元素相对屏幕初始X坐标 */
        const init_el_x = el_rect.left + el_rect.width / 2;
        /** 元素相对屏幕初始Y坐标 */
        const init_eye_y = el_rect.top + el_rect.height / 2;
        /** 元素距离屏幕右边的距离 */
        const el_right = window.innerWidth - init_el_x;
        /** 元素距离屏幕底部的距离 */
        const el_bottom = window.innerHeight - init_eye_y;

        getElMoveValueX = (x: number) => {
          return (x / Math.max(el_right, window.innerWidth - el_right)) * max;
        };
        getElMoveValueY = (y: number) => {
          return (y / Math.max(el_bottom, window.innerHeight - el_bottom)) * max;
        };
      }

      return {
        getElMoveValueX,
        getElMoveValueY,
      };
    };
  };

  const getMoveValue = init();

  const handleMouseMove = (event: MouseEvent) => {
    if (!el) return;
    const { getElMoveValueX, getElMoveValueY } = getMoveValue();
    // 获取鼠标在窗口中的位置
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 获取元素在窗口中的位置
    const el_rect = el.getBoundingClientRect();
    const eyeX = el_rect.left + el_rect.width / 2;
    const eyeY = el_rect.top + el_rect.height / 2;

    // 计算鼠标相对于元素中心的偏移量
    const deltaX = mouseX - eyeX;
    const deltaY = mouseY - eyeY;

    // 限制在正负范围内
    const limitX = Math.min(max, Math.max(-max, getElMoveValueX?.(deltaX)));
    const limitY = Math.min(max, Math.max(-max, getElMoveValueY?.(deltaY)));

    callback(el, limitX, limitY);
  };

  const ExposeMethods = {
    /** @description 启用跟随动画 */
    enableMouseTrackingEffect() {
      el.style.transform = "";
      window.addEventListener("mousemove", handleMouseMove);
    },

    /** @description 禁用跟随动画 */
    disableMouseTrackingEffect() {
      window.removeEventListener("mousemove", handleMouseMove);
      el.style.transform = "";
    },
  };

  return {
    ...ExposeMethods,
  };
};

export { useMouseTrackingEffect };
