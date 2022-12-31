<template>
  <div class="lib-range">
    <div class="slider-value" v-if="showNum">
      <span :class="{ 'show-num': show_num }" :style="{ left: barWidth }">
        {{ text || modelValue }}
      </span>
    </div>
    <div class="field">
      <div class="bar" :style="{ width: barWidth, backgroundColor: color }">
        <img
          :src="icon"
          v-show="showIcon && showDot"
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
        @input="changeValue($event.target.value)"
        @mouseup="hide"
        type="range"
        :min="min"
        :max="max"
        :step="step"
      />
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, toRefs } from "vue";

const props = defineProps({
  /* 最小值 */
  min: {
    type: Number,
    default: 0,
  },
  /* 最大值 */
  max: {
    type: Number,
    default: 100,
  },
  /* 进度条值，通过v-model */
  modelValue: {
    type: Number,
    default: 0,
  },
  /* 进度条自定义悬浮文本 */
  text: {
    type: String,
    default: "",
  },
  /* 进度条颜色 */
  color: {
    type: String,
    default: "#3498db",
  },
  /* 圆点和图标大小，实际上可点击的范围依然是20px * 20px */
  size: {
    type: Number,
    default: 35,
  },
  /* 是否显示圆点，也决定是否显示图标 */
  showDot: {
    type: Boolean,
    default: true,
  },
  /* 是否显示图标 */
  showIcon: {
    type: Boolean,
    default: true,
  },
  /* 自定义图标1:1 */
  icon: {
    type: String,
    default: "https://lengyibai.gitee.io/wzry-material/image/range_icon.png",
  },
  /* 是否在滑动的时候显示数字 */
  showNum: {
    type: Boolean,
    default: true,
  },
  /* 步长 */
  step: {
    type: Number,
    default: 1,
  },
});
const { modelValue, max, min, size, showDot } = toRefs(props);

const rotate = ref(0);
const show_num = ref(false);

const barWidth = computed(() => {
  const value = modelValue.value - min.value;
  const maxs = max.value - min.value;
  return `calc(${value / (maxs / 100)}% + ${
    ((size.value - (showDot.value ? 0 : 25)) * (maxs / 2 - value)) / maxs
  }px)`;
});

onMounted(() => {
  const root = document.querySelector(":root");
  root.style.setProperty("--size", `${size.value}px`);
});

const emit = defineEmits(["update:modelValue"]);
const changeValue = (v) => {
  show_num.value = true;
  emit("update:modelValue", parseFloat(v));
  rotate.value = v / max.value;
};
const hide = () => {
  show_num.value = false;
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
