<template>
  <div class="form-input" :class="{ disabled: disabled }">
    <!-- 右侧描述 -->
    <div class="label" :style="{ width: labelWidth }">
      <span class="text-gradient-one"
        ><i v-if="required" class="star">*</i>{{ label }}：
      </span>
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
  width?: string; //输入框宽度
  disabled?: boolean; //是否禁用
  label?: string; //左侧文字
  labelWidth?: string; //左侧文字宽度
  required?: boolean; //是否必填
  min?: number; //最小值
  max?: number; //最大值
  text?: string; //进度条自定义悬浮文本
  color?: string; //进度条颜色
  size?: number; //圆点和图标大小，实际上可点击的范围依然是20px * 20px
  showDot?: boolean; //是否显示圆点，也决定是否显示图标
  showIcon?: boolean; //是否显示图标
  icon?: string; //自定义图标1:1
  showNum?: boolean; //是否在滑动的时候显示数字
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
  required: false,
  min: 0,
  max: 100,
  text: "",
  color: "#3498db",
  size: 35,
  showDot: true,
  showIcon: true,
  icon: IMGBED + "/image/range_icon.png",
  showNum: true,
  step: 1,
});
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const show_num = ref(false); //是否在滑动的时候显示数字

/* 设置可拖动宽度 */
const barWidth = computed(() => {
  const value = Number(props.modelValue) - props.min;
  const maxs = props.max - props.min;
  return `calc(${value / (maxs / 100)}% + ${
    ((props.size - (props.showDot ? 0 : 25)) * (maxs / 2 - value)) / maxs
  }px)`;
});

/* 设置按钮大小 */
onMounted(() => {
  const root = document.querySelector(":root") as HTMLElement;
  root.style.setProperty("--size", `${props.size}px`);
});

/* 拖动时触发 */
const changeValue = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  show_num.value = true;
  emit("update:modelValue", parseFloat(v));
  $throttleInstant(() => {
    $switchStore.$clickAudio("range");
  }, 50);
};

/* 隐藏数字 */
const hide = () => {
  show_num.value = false;
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
