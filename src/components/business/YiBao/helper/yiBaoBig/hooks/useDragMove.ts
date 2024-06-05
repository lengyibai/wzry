/** @description 拖动乂宝 */
const useDragMove = (el: HTMLElement) => {
  const sensitive = 3.5;
  let x = 0;
  let y = 0;
  let X = 0;
  let Y = 0;
  let downX = 0;
  let downY = 0;

  const rotate = (moveX: number, moveY: number) => {
    x = moveX - downX + X;
    y = downY - moveY + Y;
    el.style.transform = "rotateX(" + y / sensitive + "deg) rotateY(" + x / sensitive + "deg)";
  };

  /** @description 鼠标一定是事件 */
  const onMouseMove = (e: MouseEvent) => {
    rotate(e.clientX, e.clientY);
  };

  /** @description 手指触发移动事件 */
  const onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    rotate(touch.clientX, touch.clientY);
  };

  /** @description 抬起事件清除移动事件 */
  const handleUp = () => {
    X = x;
    Y = y;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onTouchMove);
  };
  window.addEventListener("mouseup", handleUp);
  window.addEventListener("touchend", handleUp);

  /** @description 按下移动动画 */
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (e instanceof MouseEvent) {
      downX = e.clientX;
      downY = e.clientY;
      window.addEventListener("mousemove", onMouseMove);
    } else {
      const touch = e.touches[0];
      downX = touch.clientX;
      downY = touch.clientY;
      window.addEventListener("touchmove", onTouchMove);
    }
  };

  const ExposeMethods = {
    /** @description 启用按下拖动 */
    enableDragMove() {
      el.addEventListener("mousedown", handleMove);
      el.addEventListener("touchstart", handleMove);
    },

    /** @description 禁用按下拖动 */
    disableDragMove() {
      el.removeEventListener("mousedown", handleMove);
      el.removeEventListener("touchstart", handleMove);
      el.style.transform = "";
      x = 0;
      y = 0;
    },
  };

  return {
    ...ExposeMethods,
  };
};

export { useDragMove };
