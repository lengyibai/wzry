/**
 * v-drag
 * 用于英雄详情页-皮肤页拖拽头像
 */
import type { Directive } from "vue";

interface Params {
  /** 按下回调 */
  downCallback: () => void;
  /** 拖拽回调 */
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
  /** 是否启用拖拽 */
  enable: boolean;
}

const vDrag: Directive<HTMLElement, Params> = {
  //指令的 mounted 钩子函数，在元素被插入到 DOM 中时触发
  mounted(el, binding) {
    const { downCallback, handleDrag, index, enable } = binding.value;

    //设置元素的样式，禁止用户选择元素内容，并将元素定位为绝对定位
    el.style.userSelect = "none";
    el.style.position = "absolute";

    /* /触摸点的初始水平位置 */
    let x = 0;
    /* /触摸点的初始垂直位置 */
    let y = 0;
    /* 元素的初始水平位置 */
    let startX = 0;
    /* 元素的初始垂直位置 */
    let startY = 0;
    /* 元素水平方向的移动距离 */
    let moveX = 0;
    /* 元素垂直方向的移动距离 */
    let moveY = 0;

    const handleDown = (event: MouseEvent | TouchEvent) => {
      downCallback();
      if (!enable) return;

      //记录按下时的位置和元素初始位置
      if (event instanceof MouseEvent) {
        x = event.pageX;
        y = event.pageY;
      } else if (event instanceof TouchEvent) {
        x = event.touches[0].pageX;
        y = event.touches[0].pageY;
      }

      //获取元素初始位置
      startX = el.offsetLeft;
      startY = el.offsetTop;

      //监听移动事件
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove);

      //监听松开事件
      window.addEventListener("mouseup", handleUp, { once: true });
      window.addEventListener("touchend", handleUp, { once: true });
    };

    function handleMove(event: MouseEvent | TouchEvent) {
      //计算移动的距离
      if (event instanceof MouseEvent) {
        moveX = event.pageX - x;
        moveY = event.pageY - y;
      } else if (event instanceof TouchEvent) {
        moveX = event.touches[0].pageX - x;
        moveY = event.touches[0].pageY - y;
      }

      //更新元素的位置
      el.style.left = `${moveX + startX}px`;
      el.style.top = `${moveY + startY}px`;

      //调用回调函数，传递元素的位置信息和索引
      handleDrag(
        el,
        {
          x: el.getBoundingClientRect().left + el.offsetWidth / 2,
          y: el.getBoundingClientRect().top + el.offsetHeight / 2,
        },
        index,
      );
    }

    function handleUp() {
      //松开时，调用回调函数，传递结束拖拽的信息和索引
      handleDrag(el, false, index);

      //移除移动事件的监听器
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    }

    el.addEventListener("mousedown", handleDown);
    el.addEventListener("touchstart", handleDown);
  },
};

export { vDrag };
