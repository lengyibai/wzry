/**
 * v-down-drag
 * 按下拖拽
 */

import { Directive } from "vue";

const downDrag: Directive = {
  mounted(el: HTMLElement) {
    const dragData = {
      isDragging: false,
      startX: 0,
      startY: 0,
      left: 0,
      top: 0,
    };

    const time = el.style.transitionDuration;

    const handleMouseDown = (event: any) => {
      el.style.transitionDuration = "0s";
      dragData.isDragging = true;
      dragData.startX = event.pageX || event.touches[0].pageX;
      dragData.startY = event.pageY || event.touches[0].pageY;
      dragData.left = el.offsetLeft;
      dragData.top = el.offsetTop;
    };

    const handleMouseMove = (event: any) => {
      if (!dragData.isDragging) return;

      const offsetX = (event.pageX || event.touches[0].pageX) - dragData.startX;
      const offsetY = (event.pageY || event.touches[0].pageY) - dragData.startY;

      const left = dragData.left + offsetX;
      const top = dragData.top + offsetY;

      // 获取屏幕尺寸
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // 计算元素最大可移动范围
      const maxLeft = screenWidth - el.offsetWidth;
      const maxTop = screenHeight - el.offsetHeight;

      // 限制元素不超出屏幕
      const newLeft = Math.max(0, Math.min(maxLeft, left));
      const newTop = Math.max(0, Math.min(maxTop, top));

      // 更新元素位置
      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
    };

    const handleMouseUp = () => {
      el.style.transitionDuration = time;
      dragData.isDragging = false;
    };

    // 监听鼠标事件
    window.onmousedown = handleMouseDown;
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;

    // 监听触摸事件
    window.ontouchstart = handleMouseDown;
    window.ontouchmove = handleMouseMove;
    window.ontouchend = handleMouseUp;
  },
  unmounted() {},
};

export default downDrag;
