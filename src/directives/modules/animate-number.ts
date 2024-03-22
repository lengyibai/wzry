/**
 * v-animate-number
 * 数字滚动
 */
import type { Directive, DirectiveBinding } from "vue";

interface ElType extends HTMLElement {
  /** 上一次的数字，用于递增 */
  _last_num: number;
  /** 更新数据 */
  _update: (v: DirectiveBinding<Params>) => void;
}

interface Params {
  /** 数字 */
  num: string | number;
  /** 动画时间 */
  duration?: number;
  /** 保留几位小数 */
  decimalPlaces?: number;
  /** 是否只执行一次 */
  once?: boolean;
  /** 格式化 */
  format?: (v: string) => string;
}

const vAnimateNumber: Directive<ElType, Params> = {
  mounted(el, binding) {
    el._update = (binding) => {
      const { num, duration = 1000, decimalPlaces = 0, format = (v) => v } = binding.value;

      if (num === "") {
        el.innerText = "";
        return;
      }

      if (!isNaN(Number(num))) {
        const startNumber = el._last_num || 0;
        const startTime = performance.now();
        const targetNumber = Number(num);

        const updateNumber = (timestamp: number) => {
          const elapsed = timestamp - startTime;
          const progress = elapsed / duration;

          if (progress >= 1) {
            el.innerText = format(targetNumber.toFixed(decimalPlaces));
            el._last_num = targetNumber;
            return;
          }

          // 修改这里，确保无论数字增加还是减少，都能平滑过渡
          const currentNumber = startNumber + (targetNumber - startNumber) * Math.min(progress, 1);

          const num = currentNumber.toFixed(decimalPlaces);

          el.innerText = format(num);

          requestAnimationFrame(updateNumber);
        };

        requestAnimationFrame(updateNumber);
      } else {
        el.innerText = num as string;
      }
    };
    el._update(binding);
  },
  updated(el, binding) {
    const { once = true } = binding.value;
    if (once) return;
    el._update(binding);
  },
};

export { vAnimateNumber };
