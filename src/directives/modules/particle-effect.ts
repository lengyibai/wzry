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
  /** 粒子颜色 */
  color: string;
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
  private color!: string;
  /** 粒子尺寸 */
  private size!: number;
  /** 是否从上到下 */
  private down = false;
  /** 浏览器是否处于后台状态 */
  private is_hide = false;

  constructor(parent: HTMLElement, config: Params) {
    const { count, color, size, down } = config;
    this.parent = parent;
    this.count = count;
    this.size = size;
    this.color = color;
    this.down = down;

    this.init();

    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.is_hide = true;
      } else {
        this.is_hide = false;
      }
    });
  }

  private init() {
    if (this.childElements.length === 0) {
      /* 创建粒子 */
      for (let index = 0; index < this.count; index++) {
        const box = document.createElement("div");

        box.style.cssText = `
          position: absolute;
          background-color: ${this.color};
          pointer-events: none;
          box-shadow: 0 0 0.3125rem 0 ${this.color},
          0 0 0.625rem 0 ${this.color},
          0 0 1.25rem 0 ${this.color},
          0 0 1.875rem 0 ${this.color};
          filter: brightness(250%);
        `;

        this.childElements.push(box);
        this.parent.appendChild(box);
      }
    }

    /* 生成粒子 */
    let index = 0;
    const interval_id = setInterval(() => {
      if (index !== this.childElements.length) {
        const el = this.childElements[index];
        this.playAnimate(el);
        index++;

        const debouncePlayAnimate = _debounce(this.playAnimate.bind(this), 100);
        el.addEventListener("transitionend", () => {
          if (this.is_hide) return;
          debouncePlayAnimate(el);
        });
      } else {
        clearInterval(interval_id);
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
    circle.style.opacity = "1";
    circle.style.left = x + "%";
    circle.style.transform = `scale(1)`;

    if (this.down) {
      circle.style.bottom = "50%";
    }

    //移出到父元素可视区外
    setTimeout(() => {
      const end = $tool.random(35, 100);

      if (this.down) {
        circle.style.bottom = -end + "%";
      } else {
        circle.style.bottom = end + "%";
      }
      circle.style.opacity = "0";
      circle.style.left = $tool.random(x - 5, x + 5) + "%";
      circle.style.transform = "scale(0.25)";
      circle.style.transition = `
        all ${duration}ms linear,
        opacity ${duration * 0.5}ms ${duration * 0.5}ms linear,
        transform ${duration * 0.5}ms ${duration * 0.5}ms ease-out`;
    }, 100);
  }

  /** @description 关闭 */
  close() {
    this.childElements.forEach((el) => el.remove());
  }
}

const vParticleEffect: Directive<ElType, Partial<Params>> = {
  mounted(el, binding) {
    el._fn = function (binding: DirectiveBinding<Partial<Params>>) {
      const {
        count = 30,
        color = "#2e5283",
        size = 6,
        enable = true,
        down = false,
      } = binding.value || {};

      if (!enable) return;
      this._particle = new AnimateMove(el, {
        count,
        color,
        size,
        enable,
        down,
      });
    };
    el._fn(binding);
  },
  updated(el, binding) {
    if (binding?.value?.enable === false) {
      el._particle?.close();
    } else if (binding?.value?.enable === true) {
      el._particle?.close();
      el._fn(binding);
    }
  },
  unmounted(el) {
    el._particle?.close();
  },
};

export { vParticleEffect };
