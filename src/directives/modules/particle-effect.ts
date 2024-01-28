/**
 * v-particle-effect
 * 从下往上的粒子特效
 */
import type { Directive, DirectiveBinding } from "vue";
import _debounce from "lodash/debounce";

import { $tool } from "@/utils";

interface ElType extends HTMLElement {
  /** 启用 */
  _fn: (binding: DirectiveBinding<Partial<Params>>) => void;
  /** 粒子特效构造方法 */
  _particle?: AnimateMove;
}

interface Params {
  /** 生成的数量 */
  count: number;
  /** 粒子颜色组 */
  colors: string[];
  /** 粒子最大尺寸大小 */
  size: number;
  /** 是否启用 */
  enable: boolean;
  /** 是否从上到下 */
  down: boolean;
}

/** @description 粒子特效 */
export class AnimateMove {
  /** 父容器 */
  private parent: HTMLElement;
  /** 生成的元素 */
  private childElements: HTMLElement[] = [];
  /** 粒子数量 */
  private count!: number;
  /** 粒子颜色 */
  private colors!: string[];
  /** 粒子尺寸 */
  private size!: number;
  /** 是否从上到下 */
  private down = false;
  /** 生成粒子计时器 */
  private timer!: NodeJS.Timeout;

  constructor(parent: HTMLElement, config: Params) {
    const { count, colors, size, down } = config;
    this.parent = parent;
    this.count = count;
    this.size = size;
    this.colors = colors;
    this.down = down;

    this.init();
  }

  private init() {
    if (this.childElements.length === 0) {
      /* 创建粒子 */
      for (let index = 0; index < this.count; index++) {
        const box = document.createElement("div");
        const index = $tool.random(0, this.colors.length - 1);
        const colors = this.colors[index];
        const status = $tool.random(0, 1);

        box.style.cssText = `
          position: absolute;
          background-color: ${colors};
          pointer-events: none;
          box-shadow: 0 0 0.3125rem 0 ${colors},
          0 0 0.625rem 0 ${colors},
          0 0 1.25rem 0 ${colors},
          0 0 1.875rem 0 ${colors};
          filter: brightness(${status === 0 ? 150 : 250}%);
        `;

        this.childElements.push(box);
        this.parent.appendChild(box);
      }
    }

    /* 生成粒子 */
    let index = 0;
    this.timer = setInterval(() => {
      if (index !== this.childElements.length) {
        const el = this.childElements[index];
        this.playAnimate(el);
        index++;

        const debouncePlayAnimate = _debounce(this.playAnimate.bind(this), 1000);
        el.ontransitionend = () => {
          debouncePlayAnimate(el);
        };
      } else {
        clearInterval(this.timer);
      }
    }, 10000 / this.count);
  }

  /** @description 播放动画 */
  private playAnimate(circle: HTMLElement) {
    //设置随机位置
    const x = $tool.random(0, 100);
    const size = $tool.random(this.size / 3, this.size);
    const duration = (size * 1000) / 3;

    circle.style.transition = "";
    circle.style.width = size / 16 + "rem";
    circle.style.height = size / 16 + "rem";
    circle.style.bottom = "0";
    circle.style.left = x + "%";
    circle.style.transform = `translateY(100%) translateZ(0) rotate(${540 - size * 60}deg)`;

    if (this.down) {
      circle.style.opacity = "0";
      circle.style.bottom = "50%";
    } else {
      circle.style.opacity = "1";
    }

    //移出到父元素可视区外
    setTimeout(() => {
      circle.style.transition = `
        all ${duration}ms linear,
        opacity ${duration * 0.5}ms linear,
        transform ${duration * 0.5}ms ease-out`;

      const end = $tool.random(35, 100);
      if (this.down) {
        circle.style.opacity = "1";
        circle.style.bottom = -end + "%";
      } else {
        circle.style.bottom = end + "%";
      }

      circle.style.transform = "translateZ(0)";
      circle.style.left = $tool.random(x - 5, x + 5) + "%";

      setTimeout(() => {
        circle.style.opacity = "0";
        circle.style.transform = `translateZ(0) rotate(${720 - size * 60}deg) scale(0.25)`;
      }, duration * 0.5);
    }, 100);
  }

  /** @description 关闭 */
  destroy() {
    clearInterval(this.timer);
    this.childElements.forEach((el) => {
      el.ontransitionend = null;
      el.remove();
    });
    this.childElements = [];
  }
}

const vParticleEffect: Directive<ElType, Partial<Params>> = {
  mounted(el, binding) {
    el._fn = function (binding: DirectiveBinding<Partial<Params>>) {
      const {
        count = 30,
        colors = ["#227093", "#b33939"],
        size = 8,
        enable = true,
        down = false,
      } = binding.value || {};

      if (!enable) return;
      this._particle = new AnimateMove(el, {
        count,
        colors,
        size,
        enable,
        down,
      });
    };
    el._fn(binding);
  },
  updated(el, binding) {
    if (binding?.value?.enable === false) {
      el._particle?.destroy();
    } else if (binding?.value?.enable === true) {
      el._particle?.destroy();
      el._fn(binding);
    }
  },
  unmounted(el) {
    el._particle?.destroy();
  },
};

export { vParticleEffect };
