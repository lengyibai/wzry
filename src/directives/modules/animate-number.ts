/**
 * v-animate-number
 * 数字滚动
 */
import type { Directive, DirectiveBinding } from "vue";

interface ElType extends HTMLElement {
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
        const startNumber = 0;
        const startTime = performance.now();
        const targetNumber = Number(num);

        const updateNumber = (timestamp: number) => {
          const elapsed = timestamp - startTime;
          const progress = elapsed / duration;

          if (progress >= 1) {
            el.innerText = format(targetNumber.toFixed(decimalPlaces));
            return;
          }

          const currentNumber = startNumber + (targetNumber - startNumber) * progress;

          const num = Math.max(startNumber, Math.min(targetNumber, currentNumber)).toFixed(
            decimalPlaces,
          );

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
