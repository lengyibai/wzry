/**
 * v-drag
 * 用于英雄详情页-皮肤页拖拽头像
 */
import type { Directive } from "vue";

interface Params {
  handleDrag: (
    data: HTMLElement,
    offset:
      | boolean
      | {
          x: number;
          y: number;
        },
    index: number,
  ) => void;
  index: number;
}

const vDrag: Directive<HTMLElement, Params> = {
  // 指令的 mounted 钩子函数，在元素被插入到 DOM 中时触发
  mounted(el, binding) {
    const { handleDrag, index } = binding.value;

    // 设置元素的样式，禁止用户选择元素内容，并将元素定位为绝对定位
    el.style.userSelect = "none";
    el.style.position = "absolute";

    let x = 0; // 鼠标/触摸点的初始水平位置
    let y = 0; // 鼠标/触摸点的初始垂直位置
    let startX = 0; // 元素的初始水平位置
    let startY = 0; // 元素的初始垂直位置
    let moveX = 0; // 元素水平方向的移动距离
    let moveY = 0; // 元素垂直方向的移动距离

    /* PC端 */
    el.addEventListener("mousedown", (e: MouseEvent) => {
      // 记录鼠标按下时的位置和元素初始位置
      x = e.pageX;
      y = e.pageY;
      startX = el.offsetLeft;
      startY = el.offsetTop;

      function fn(e: MouseEvent) {
        // 计算鼠标移动的距离
        moveX = e.pageX - x;
        moveY = e.pageY - y;

        // 更新元素的位置
        el.style.left = `${moveX + startX}px`;
        el.style.top = `${moveY + startY}px`;

        // 调用回调函数，传递元素的位置信息和索引
        handleDrag(
          el,
          {
            x: el.getBoundingClientRect().left + el.offsetWidth / 2,
            y: el.getBoundingClientRect().top + el.offsetHeight / 2,
          },
          index,
        );
      }

      // 监听鼠标移动事件
      window.addEventListener("mousemove", fn);

      function up() {
        // 鼠标松开时，调用回调函数，传递结束拖拽的信息和索引
        handleDrag(el, false, index);

        // 移除鼠标移动事件的监听器
        window.removeEventListener("mousemove", fn);

        // 在下一个事件循环中，移除鼠标松开事件的监听器
        setTimeout(() => {
          window.removeEventListener("mouseup", up);
        });
      }

      // 监听鼠标松开事件
      window.addEventListener("mouseup", up);
    });

    /* 兼容移动端 */
    el.addEventListener("touchstart", (e: TouchEvent) => {
      // 记录触摸点按下时的位置和元素初始位置
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
      startX = el.offsetLeft;
      startY = el.offsetTop;

      function fn(e: TouchEvent) {
        // 计算触摸点移动的距离
        moveX = e.changedTouches[0].pageX - x;
        moveY = e.changedTouches[0].pageY - y;

        // 更新元素的位置
        el.style.left = `${moveX + startX}px`;
        el.style.top = `${moveY + startY}px`;

        // 调用回调函数，传递元素的位置信息和索引
        handleDrag(
          el,
          {
            x: el.getBoundingClientRect().left + el.offsetWidth / 2,
            y: el.getBoundingClientRect().top + el.offsetHeight / 2,
          },
          index,
        );
      }

      // 监听触摸点移动事件
      window.addEventListener("touchmove", fn);

      function up(e: TouchEvent) {
        e.stopPropagation();

        // 触摸点松开时，调用回调函数，传递结束拖拽的信息和索引
        handleDrag(el, false, index);

        // 移除触摸点移动事件的监听器
        window.removeEventListener("touchmove", fn);

        // 在下一个事件循环中，移除触摸点松开事件的监听器
        setTimeout(() => {
          window.removeEventListener("touchend", up);
        });
      }

      // 监听触摸点松开事件
      window.addEventListener("touchend", up);
    });
  },
};

export { vDrag };
