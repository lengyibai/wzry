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
          <img v-show="showIcon && showDot" :src="icon" :style="{ width: size + 'px', height: size + 'px' }" />
          <span
            v-show="showDot && !showIcon"
            :style="{
              width: size + 'px',
              height: size + 'px',
            }"
          ></span>
        </div>
        <input
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
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import { $throttleInstant } from "@/utils";
import switchStore from "@/store/switch";

interface Props {
  modelValue: string | number; //值
  disabled?: boolean; //禁用
  width?: string; //输入框宽度
  min?: number; //最小值
  max?: number; //最大值
  text?: string; //进度条自定义悬浮文本
  size?: number; //圆点和图标大小，实际上可点击的范围依然是20px * 20px
  trackColor?: string; //轨道背景色
  showDot?: boolean; //显示圆点，也决定显示图标
  showIcon?: boolean; //显示图标
  icon?: string; //自定义图标1:1
  showNum?: boolean; //在滑动的时候显示数字
  step?: number; //步长
}
interface Emits {
  (e: "update:modelValue", v: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  width: "200px",
  disabled: false,
  label: "标题",
  labelWidth: "150px",
  min: 0,
  max: 100,
  text: "",
  size: 35,
  showDot: true,
  trackColor: "var(--theme-color-one)",
  showIcon: true,
  icon: IMGBED + "/image/range_icon.png",
  showNum: true,
  step: 1,
});
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const down = ref(false); //是否处于按下状态

/* 设置可拖动宽度 */
const barWidth = computed(() => {
  const value = Number(props.modelValue) - props.min;
  const maxs = props.max - props.min;
  return `calc(${value / (maxs / 100)}% + ${((props.size - (props.showDot ? 0 : 25)) * (maxs / 2 - value)) / maxs}px)`;
});

/* 设置按钮大小 */
onMounted(() => {
  const root = document.querySelector(":root") as HTMLElement;
  root.style.setProperty("--size", `${props.size}px`);
});

/* 拖动时触发 */
const changeValue = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  down.value = true;
  emit("update:modelValue", parseFloat(v));
  $throttleInstant(() => {
    $switchStore.$clickAudio("range");
  }, 50);
};

/* 隐藏数字 */
const hide = () => {
  down.value = false;
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
