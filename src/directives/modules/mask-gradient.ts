/**
 * v-mask-gradient
 * 底部渐变
 */
import type { Directive } from "vue";

interface Params {
  /** 渐变颜色 */
  color: string;
  /** 旋转角度 */
  rotate: string;
  /** 渐变起始位置 */
  start: string;
  /** 渐变结束位置 */
  end: string;
}

const vMaskGradient: Directive<HTMLElement, Partial<Params>> = {
  mounted(el, binding) {
    const {
      color = "rgba(0, 0, 0, 0.75)",
      rotate = "0deg",
      start = "0%",
      end = "50%",
    } = binding.value || {};

    const mask = document.createElement("div");
    mask.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(${rotate}, ${color} ${start}, transparent ${end});
    pointer-events: none;
    `;
    el.appendChild(mask);
  },
};

export { vMaskGradient };
