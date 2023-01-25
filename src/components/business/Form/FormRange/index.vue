<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import { $throttleInstant } from "@/utils";
import switchStore from "@/store/switch";

interface Props {
  modelValue: string | number; //值
  width?: string; //输入框宽度
  color?: string; //进度条颜色
  disabled?: boolean; //禁用
  icon?: string; //自定义图标1:1
  label?: string; //左侧文字
  labelWidth?: string; //左侧文字宽度
  max?: number; //最大值
  min?: number; //最小值
  required?: boolean; //必填
  showDot?: boolean; //显示圆点，也决定显示图标
  showIcon?: boolean; //显示图标
  showNum?: boolean; //在滑动的时候显示数字
  size?: number; //圆点和图标大小，实际上可点击的范围依然是20px * 20px
  step?: number; //步长
  text?: string; //进度条自定义悬浮文本
}
const props = withDefaults(defineProps<Props>(), {
  color: "#3498db",
  icon: IMGBED + "/image/range_icon.png",
  label: "标题",
  labelWidth: "150px",
  max: 100,
  min: 0,
  showDot: true,
  showIcon: true,
  showNum: true,
  size: 35,
  step: 1,
  width: "200px",
});

interface Emits {
  (e: "update:modelValue", v: number): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const show_num = ref(false); //在滑动的时候显示数字

//设置可拖动宽度
const barWidth = computed(() => {
  const value = Number(props.modelValue) - props.min;
  const maxs = props.max - props.min;

  return `calc(${value / (maxs / 100)}% + ${
    ((props.size - (props.showDot ? 0 : 25)) * (maxs / 2 - value)) / maxs
  }px)`;
});

/* 拖动时触发 */
const handleDrag = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  show_num.value = true;
  emit("update:modelValue", parseFloat(v));

  $throttleInstant(() => {
    $switchStore.$clickAudio("range");
  }, 50);
};

/* 设置按钮大小 */
onMounted(() => {
  const root = document.querySelector(":root") as HTMLElement;
  root.style.setProperty("--size", `${props.size}px`);
});
</script>

<template>
  <div class="form-input" :class="{ disabled: disabled }">
    <!-- 右侧描述 -->
    <div class="label" :style="{ width: labelWidth }">
      <span class="text-gradient-one"><i v-if="required" class="star">*</i>{{ label }}： </span>
    </div>

    <!-- 输入框 -->
    <div class="input" :style="{ width: width }">
      <div v-if="showNum" class="slider-value">
        <span :class="{ 'show-num': show_num }" :style="{ left: barWidth }">
          {{ text || modelValue }}
        </span>
      </div>
      <div class="field">
        <div class="bar" :style="{ width: barWidth, backgroundColor: color }">
          <img
            v-show="showIcon && showDot"
            :src="icon"
            :style="{ width: size + 'px', height: size + 'px' }"
          />
          <span
            v-show="showDot && !showIcon"
            :style="{
              width: size + 'px',
              height: size + 'px',
              backgroundColor: color,
            }"
          ></span>
        </div>
        <input
          :value="modelValue"
          type="range"
          :min="min"
          :max="max"
          :step="step"
          @input="handleDrag"
          @mouseup="show_num = false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
