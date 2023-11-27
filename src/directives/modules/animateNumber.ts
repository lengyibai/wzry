/**
 * v-animateNumber
 * 数字滚动
 */
import type { Directive } from "vue";

interface Params {
  /** 数字 */
  num: any;
  /** 动画时间 */
  duration?: number;
  /** 保留几位小数 */
  decimalPlaces?: number;
}

/* 数字动画 */
const animateNumber = (
  el: HTMLElement,
  targetNumber: number,
  duration: number = 1000,
  decimalPlaces = 0,
) => {
  const startNumber = 0;
  const startTime = performance.now();

  const updateNumber = (timestamp: number) => {
    const elapsed = timestamp - startTime;
    const progress = elapsed / duration;

    if (progress >= 1) {
      el.innerText = targetNumber.toFixed(decimalPlaces);
      return;
    }

    const currentNumber = startNumber + (targetNumber - startNumber) * progress;

    el.innerText = Math.max(startNumber, Math.min(targetNumber, currentNumber)).toFixed(
      decimalPlaces,
    );

    requestAnimationFrame(updateNumber);
  };

  requestAnimationFrame(updateNumber);
};

const vAnimateNumber: Directive<HTMLInputElement, Params> = {
  mounted(el, binding) {
    const { num, duration, decimalPlaces } = binding.value;

    if (num === "") {
      el.innerText = "";
      return;
    }

    if (!isNaN(Number(num))) {
      animateNumber(el, Number(num), duration, decimalPlaces);
    } else {
      el.innerText = num as string;
    }
  },
};

export { vAnimateNumber };