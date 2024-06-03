/**
 * v-animate-number
 * 数字改变动画
 */

import type { Directive, DirectiveBinding } from "vue";

// HTML元素类型扩展接口，包含自定义属性
interface ElType extends HTMLElement {
  /** 上一次的数字，用于递增 */
  _last_num: number;
  /** 更新数据 */
  _update: (v: DirectiveBinding<Params>) => void;
}

// 指令参数接口
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

// 数字滚动指令
const vAnimateNumber: Directive<ElType, Params> = {
  // 指令挂载时执行
  mounted(el, binding) {
    // 更新函数
    el._update = (binding) => {
      // 解构指令参数
      const { num, duration = 1000, decimalPlaces = 0, format = (v) => v } = binding.value;

      // 如果数字为空，则清空元素文本内容并返回
      if (num === "") {
        el.innerText = "";
        return;
      }

      // 如果是数字
      if (!isNaN(Number(num))) {
        /** 开始数字 */
        const startNumber = el._last_num || 0;
        /** 开始时间 */
        const startTime = performance.now();
        /** 目标数字 */
        const targetNumber = Number(num);

        /** @description 更新数字函数
         * @param timestamp 时间戳
         */
        const updateNumber = (timestamp: number) => {
          /** 已过去时间 */
          const elapsed = timestamp - startTime;
          /** 时间进度 */
          const progress = elapsed / duration;

          // 如果动画播放完成
          if (progress >= 1) {
            // 设置元素文本为目标数字
            el.innerText = format(targetNumber.toFixed(decimalPlaces));
            // 更新上一次的数字为目标数字
            el._last_num = targetNumber;
            return;
          }

          // 根据进度计算当前数字
          const currentNumber = startNumber + (targetNumber - startNumber) * Math.min(progress, 1);

          // 格式化当前数字并设置元素文本内容
          const num = currentNumber.toFixed(decimalPlaces);
          el.innerText = format(num);

          requestAnimationFrame(updateNumber);
        };

        requestAnimationFrame(updateNumber);
      } else {
        // 如果不是数字，直接设置元素文本为字符串形式的数字
        el.innerText = num as string;
      }
    };
    // 首次调用更新函数
    el._update(binding);
  },

  updated(el, binding) {
    const { once = true } = binding.value;
    if (once) return;
    el._update(binding);
  },
};

export { vAnimateNumber };
