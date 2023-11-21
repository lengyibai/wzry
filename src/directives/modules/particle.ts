/**
 * v-particle
 * 从下往上的粒子特效
 */
import type { Directive, DirectiveBinding } from "vue";

import { $tool } from "@/utils";

interface Params {
  /** 粒子颜色 */
  color: string;
  /** 粒子大小 */
  size: number;
  /** 粒子数量 */
  num: number;
  /** 是否从下往上 */
  down: boolean;
  /** 是否启用 */
  enable: boolean;
  /** 是否锁定 */
  lock: boolean;
}

const move = (el: HTMLElement, binding: DirectiveBinding<Partial<Params>>) => {
  setTimeout(() => {
    const {
      color = "#cfb45c",
      size = 10,
      num = 35,
      down = false,
      enable = true,
    } = binding.value || {};

    const clear = (el: HTMLElement) => {
      const list = el.querySelectorAll(".particle-item");
      Array.from(list).forEach((item) => {
        item.remove();
      });
    };
    if (enable) {
      clear(el);
      const box = el;
      const box_width = box.offsetWidth;
      const box_height = box.offsetHeight;

      if (down) {
        document.styleSheets[0].insertRule(
          `
      @keyframes particle-rise-${box_height} {
        0% {
          transform: translateY(-${box_height}px) translateZ(0);
          opacity: 0;
        }
        50% {
          transform: translateY(${box_height / 2}px) translateZ(0);
          opacity: 1;
        }
        100% {
          transform: translateY(${box_height}px) translateZ(0);
          opacity: 0;
        }
      }
      `,
          document.styleSheets[0].cssRules.length,
        );
      } else {
        document.styleSheets[0].insertRule(
          `
        @keyframes particle-rise-${box_height} {
          0% {
            transform: translateY(0px) translateZ(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-${box_height / 2}px) translateZ(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-${box_height}px) translateZ(0);
            opacity: 0;
          }
        }
        `,
          document.styleSheets[0].cssRules.length,
        );
      }
      for (let i = 0; i < num; i++) {
        const p = document.createElement("span");
        p.classList.add("particle-item");

        const style = `
      position: absolute;
      background-color: ${color};
      pointer-events: none;
      width: ${size}px;
      height: ${size}px;
      bottom: 0;
      opacity: 0;
      box-shadow: 0 0 10px 0 ${color};
      filter: brightness(200%);
      `;
        const left = $tool.random(0, box_width - size);
        const scale = $tool.random(0.25, 0.75, 1);
        const time = $tool.random(1, 3, 1);
        const delay = $tool.random(0, 5, 1);
        p.style.cssText = style;
        p.style.left = `${left}px`;
        p.style.scale = scale.toString();
        p.style.animation = `particle-rise-${box_height} ${time}s linear infinite`;
        p.style.animationDelay = delay + "s";

        box.appendChild(p);
      }
    } else {
      clear(el);
    }
  }, 500);
};

const vParticle: Directive<HTMLElement, Partial<Params>> = {
  mounted(el, binding) {
    move(el, binding);
  },
  updated(el, binding) {
    if (binding.value.lock) return;
    move(el, binding);
  },
};

export { vParticle };
