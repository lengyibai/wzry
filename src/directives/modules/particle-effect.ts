/**
 * v-particle-effect
 * 从从上往下及下往上的粒子特效
 */
import type { Directive, DirectiveBinding } from "vue";

import { _debounce, _random } from "@/utils/tool";

interface ElType extends HTMLElement {
  /** 启用 */
  _fn: (binding: DirectiveBinding<Partial<Params>>) => void;
  /** 粒子特效构造方法 */
  _particle?: AnimateMove;
  /** 是否启用 */
  _enable: boolean;
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
  /** 速度，默认1000 */
  speed: number;
  /** 粒子消失区间 */
  interval: number[];
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
  /** 粒子消失区间 */
  private interval!: number[];
  /** 粒子尺寸 */
  private size!: number;
  /** 粒子尺寸 */
  private speed!: number;
  /** 是否从上到下 */
  private down = false;
  /** 生成粒子计时器 */
  private timer!: NodeJS.Timeout;

  constructor(parent: HTMLElement, config: Params) {
    const { count, colors, size, down, speed, interval } = config;
    this.parent = parent;
    this.count = count;
    this.size = size;
    this.colors = colors;
    this.down = down;
    this.speed = speed;
    this.interval = interval;

    this.init();
  }

  private init() {
    if (this.childElements.length === 0) {
      /* 创建粒子 */
      for (let index = 0; index < this.count; index++) {
        const box = document.createElement("div");
        const index = _random(0, this.colors.length - 1);
        const colors = this.colors[index];
        const status = _random(0, 1);

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
    const x = _random(0, 100);
    const size = _random(this.size / 3, this.size);
    const duration = (size * this.speed) / 3;

    circle.style.transition = "";
    circle.style.width = size / 16 + "rem";
    circle.style.height = size / 16 + "rem";
    circle.style.bottom = "0";
    circle.style.left = x + "%";
    circle.style.transform = `translateY(100%) rotate(${540 - size * 60}deg)`;

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

      const end = _random(this.interval[0], this.interval[1]);
      if (this.down) {
        circle.style.opacity = "1";
        circle.style.bottom = -end + "%";
      } else {
        circle.style.bottom = end + "%";
      }

      circle.style.transform = "";
      circle.style.left = _random(x - 5, x + 5) + "%";

      setTimeout(() => {
        circle.style.opacity = "0";
        circle.style.transform = `rotate(${720 - size * 60}deg) scale(0.25)`;
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
        speed = 1000,
        interval = [35, 100],
      } = binding.value || {};

      if (!enable) return;
      el._enable = true;
      this._particle = new AnimateMove(el, {
        count,
        colors,
        size,
        enable,
        down,
        speed,
        interval,
      });
    };
    el._fn(binding);
  },

  updated(el, binding) {
    if (binding?.value?.enable === false) {
      el._particle?.destroy();
      el._enable = false;
    } else if (binding?.value?.enable === true && !el._enable) {
      el._particle?.destroy();
      el._fn(binding);
      el._enable = true;
    }
  },

  unmounted(el) {
    el._particle?.destroy();
  },
};

export { vParticleEffect };
