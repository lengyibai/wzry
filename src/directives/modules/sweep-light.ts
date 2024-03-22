/**
 * v-sweep-light
 * 卡片扫光
 */
import type { Directive } from "vue";

interface Params {
  /** 是否自动扫光 */
  auto?: boolean;
  /** 是否启用 */
  enable?: boolean;
}

const vSweepLight: Directive<HTMLElement, Params> = {
  mounted(el, binding) {
    const { enable = true, auto = true } = binding.value || {};
    if (!enable) return;
    setTimeout(() => {
      const light = document.createElement("div");
      el.style.position = "relative";
      light.style.cssText = `
      position: absolute;
      top: 0px;
      left: 0px;
      width: ${el.offsetWidth / 3}px;
      height: 100%;
      transform: skewX(45deg) translateX(${el.offsetWidth * 1.75}px);
      transition: all 2s;
      backdrop-filter: brightness(2);
    `;
      el.appendChild(light);
      if (auto) {
        light.style.transitionDelay = ` ${binding.value}s`;
        light.style.transform = `skewX(45deg) translateX(${-el.offsetWidth * 1.25}px)`;
        setTimeout(() => {
          el.removeChild(light);
        }, 2000);
      } else {
        el.addEventListener("mouseenter", () => {
          light.style.transform = `skewX(45deg) translateX(${-el.offsetWidth * 1.5}px)`;
        });

        el.addEventListener("mouseleave", () => {
          light.style.transform = `skewX(45deg) translateX(${el.offsetWidth * 1.75}px)`;
        });
      }
    });
  },
};

export { vSweepLight };
