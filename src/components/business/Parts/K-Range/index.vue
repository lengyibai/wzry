<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import { AudioStore } from "@/store";
import { $tool } from "@/utils";
import { BASE_CONFIG } from "@/config";
import { vMouseTip } from "@/directives";

interface Props {
  /** 禁用 */
  disabled?: boolean;
  /** 输入框宽度 */
  width?: string;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 进度条自定义悬浮文本 */
  text?: string;
  /** 圆点和图标大小，实际上可点击的范围依然是20px * 20px */
  size?: string;
  /** 轨道背景色 */
  trackColor?: string;
  /** 显示圆点，也决定显示图标 */
  showDot?: boolean;
  /** 显示图标 */
  showIcon?: boolean;
  /** 自定义图标1:1 */
  icon?: string;
  /** 在滑动的时候显示数字 */
  showNum?: boolean;
  /** 步长 */
  step?: number;
}

const $props = withDefaults(defineProps<Props>(), {
  width: "12.5rem",
  disabled: false,
  label: "标题",
  labelWidth: "9.375rem",
  min: 0,
  max: 100,
  text: "",
  size: "2.1875rem",
  showDot: true,
  trackColor: "var(--theme-el-color-one)",
  showIcon: true,
  icon: BASE_CONFIG.IMGBED + "/image/range_icon.png",
  showNum: true,
  step: 1,
});

/** 滑动值 */
const modelValue = defineModel({ default: 0, required: true });

const $audioStore = AudioStore();

/** 是否处于按下状态 */
const down = ref(false);

/* 设置可拖动宽度 */
const barWidth = computed(() => {
  const max = $props.max - $props.min;
  const value = (Number(modelValue.value) - $props.min) / (max / 100);
  const width = `calc(${value}% + ${20 / 2}px - ${(value / 100) * 20}px)`;

  return width;
});

/* 设置按钮大小 */
onMounted(() => {
  const root = document.querySelector(":root") as HTMLElement;
  root.style.setProperty("--size", `${$props.size}`);
});

/* 拖动时触发 */
const changeValue = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  down.value = true;
  modelValue.value = parseFloat(v);
  $tool.throttleInstant(() => {
    $audioStore.play("za86");
  }, 50);
};

/* 隐藏数字 */
const hide = () => {
  down.value = false;
};
</script>

<template>
  <div class="k-range" :class="{ disabled: disabled }">
    <!-- 输入框 -->
    <div class="input" :style="{ width: width }">
      <div v-if="showNum" class="slider-value">
        <span class="value" :class="{ 'show-num': down }" :style="{ left: barWidth }">
          {{ text || modelValue }}
        </span>
      </div>
      <div class="field">
        <div class="bar" :style="{ width: barWidth }">
          <div v-show="showIcon && showDot" class="dot"></div>
          <span
            v-show="showDot && !showIcon"
            :style="{
              width: size,
              height: size,
            }"
          ></span>
        </div>
        <input
          v-mouse-tip
          :value="modelValue"
          :disabled="disabled"
          type="range"
          :min="min"
          :max="max"
          :style="{
            backgroundColor: trackColor,
          }"
          :step="step"
          @input="changeValue"
          @mouseup="hide"
          @touchend="hide"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
