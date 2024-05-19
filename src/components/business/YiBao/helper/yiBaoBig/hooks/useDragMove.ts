/** @description 拖动乂宝 */
const useDragMove = (el: HTMLElement) => {
  const sensitive = 3.5;
  let x = 0;
  let y = 0;
  let X = 0;
  let Y = 0;
  let downX = 0;
  let downY = 0;

  const rotate = (e: MouseEvent) => {
    const moveX = e.clientX;
    const moveY = e.clientY;
    x = moveX - downX + X;
    y = downY - moveY + Y;
    el.style.transform = "rotateX(" + y / sensitive + "deg) rotateY(" + x / sensitive + "deg)";
  };

  /** @description 鼠标抬起清除移动事件 */
  const mouseup = () => {
    X = x;
    Y = y;
    window.removeEventListener("mousemove", rotate);
  };
  window.addEventListener("mouseup", mouseup);

  /** @description 按下移动动画 */
  const move = (e: MouseEvent) => {
    downX = e.clientX;
    downY = e.clientY;
    window.addEventListener("mousemove", rotate);
  };

  const ExposeMethods = {
    /** @description 启用按下拖动 */
    enableDragMove() {
      el.addEventListener("mousedown", move);
    },

    /** @description 禁用按下拖动 */
    disableDragMove() {
      el.removeEventListener("mousedown", move);
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
