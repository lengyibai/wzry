/**
 * v-maskGradient
 * 底部渐变
 */
import type { Directive, DirectiveBinding } from "vue";

const maskGradient: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const {
      color = "rgba(0, 0, 0, 0.75)",
      rotate = "0deg",
      num1 = "0%",
      num2 = "50%",
    } = binding.value || {};
    const mask = document.createElement("div");
    mask.style.cssText = `
    position: absolute;
    inset:0;
    background-image: linear-gradient(${rotate}, ${color} ${num1}, transparent ${num2});
    pointer-events: none;
    `;
    el.appendChild(mask);
  },
};

export default maskGradient;
