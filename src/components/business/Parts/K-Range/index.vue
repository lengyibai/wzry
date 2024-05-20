<script setup lang="ts">
import { ref, computed } from "vue";

import { BASE_CONFIG } from "@/config";
import { vMouseTip } from "@/directives";
import { usePlayAudio } from "@/hooks";

interface Props {
  /** 禁用 */
  disabled?: boolean;
  /** 当前宽度 */
  width?: string;
  /** 最大宽度 */
  maxWidth?: string;
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
  /** 是否显示增减按钮 */
  showStep?: boolean;
}

const $props = withDefaults(defineProps<Props>(), {
  width: "100%",
  maxWidth: "20rem",
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
  showStep: true,
});

/** 滑动值 */
const modelValue = defineModel<number>({ required: true });

const { playAudio } = usePlayAudio();

/** 是否处于按下状态 */
const down = ref(false);

/** 设置可拖动宽度 */
const barWidth = computed(() => {
  const max = $props.max - $props.min;
  const value = (Number(modelValue.value) - $props.min) / (max / 100);
  const width = `calc(${value}% + ${20 / 2}px - ${(value / 100) * 20}px)`;

  return width;
});

/** @description 拖动时触发 */
const changeValue = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  down.value = true;
  modelValue.value = parseFloat(v);
  playAudio("za86");
};

/** @description 隐藏数字 */
const hideNum = () => {
  down.value = false;
};

/** @description 减少 */
const handleSub = () => {
  if (modelValue.value > $props.min) {
    modelValue.value -= $props.step;
  }
};

/** @description 增加 */
const handleAdd = () => {
  if (modelValue.value < $props.max) {
    modelValue.value += $props.step;
  }
};
</script>

<template>
  <div
    class="k-range"
    :class="{ disabled: disabled }"
    :style="[
      {
        width: width,
        maxWidth: maxWidth,
      },
      `--size:${size}`,
    ]"
  >
    <div
      v-if="showStep"
      v-mouse-tip="{
        disabled: modelValue === min,
      }"
      :class="{
        disabled: modelValue === min,
      }"
      class="sub"
      @click="handleSub"
    ></div>
    <!-- 输入框 -->
    <div class="input">
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
          v-mouse-tip="{
            disabled: disabled,
          }"
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
          @mouseup="hideNum"
          @touchend="hideNum"
        />
      </div>
    </div>
    <div
      v-if="showStep"
      v-mouse-tip="{
        disabled: modelValue === max,
      }"
      :class="{
        disabled: modelValue === max,
      }"
      class="add"
      @click="handleAdd"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
