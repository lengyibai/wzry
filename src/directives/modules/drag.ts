/**
 * v-drag
 * 元素支持拖动
 */
import type { Directive, DirectiveBinding } from "vue";

const drag: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.userSelect = "none";
    el.style.position = "absolute";
    let x = 0;
    let y = 0;
    let startX = 0;
    let startY = 0;
    let moveX = 0;
    let moveY = 0;

    /* PC端 */
    el.addEventListener("mousedown", (e) => {
      x = e.pageX;
      y = e.pageY;
      startX = el.offsetLeft;
      startY = el.offsetTop;
      function fn(e: MouseEvent) {
        moveX = e.pageX - x;
        moveY = e.pageY - y;
        el.style.left = `${moveX + startX}px`;
        el.style.top = `${moveY + startY}px`;
        binding.value.fn(
          el,
          {
            x: el.getBoundingClientRect().left + el.offsetWidth / 2,
            y: el.getBoundingClientRect().top + el.offsetHeight / 2,
          },
          binding.value.index
        );
      }
      window.addEventListener("mousemove", fn);

      function up() {
        binding.value.fn(el, false, binding.value.index);
        window.removeEventListener("mousemove", fn);
        setTimeout(() => {
          window.removeEventListener("mouseup", up);
        });
      }
      window.addEventListener("mouseup", up);
    });

    /* 兼容移动端 */
    el.addEventListener("touchstart", (e) => {
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
      startX = el.offsetLeft;
      startY = el.offsetTop;
      function fn(e: TouchEvent) {
        moveX = e.changedTouches[0].pageX - x;
        moveY = e.changedTouches[0].pageY - y;
        el.style.left = `${moveX + startX}px`;
        el.style.top = `${moveY + startY}px`;
        binding.value.fn(
          el,
          {
            x: el.getBoundingClientRect().left + el.offsetWidth / 2,
            y: el.getBoundingClientRect().top + el.offsetHeight / 2,
          },
          binding.value.index
        );
      }
      window.addEventListener("touchmove", fn);

      function up(e: TouchEvent) {
        e.stopPropagation();
        binding.value.fn(el, false, binding.value.index);
        window.removeEventListener("touchmove", fn);
        setTimeout(() => {
          window.removeEventListener("touchend", up);
        });
      }
      window.addEventListener("touchend", up);
    });
  },
};

export default drag;
