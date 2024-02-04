<script setup lang="ts">
import { ref, onMounted } from "vue";
import { nextTick } from "vue";
import _throttle from "lodash/throttle";

import { AudioStore } from "@/store";
import { vMouseTip } from "@/directives";

interface Props {
  /** 禁用 */
  disabled?: boolean;
  /** 输入框宽度 */
  width?: string;
  /** 进度条自定义悬浮文本 */
  text?: string;
}

withDefaults(defineProps<Props>(), {
  width: "12.5rem",
  disabled: false,
  text: "",
});

/** 滑动值 */
const modelValue = defineModel<number>({ required: true });

const $audioStore = AudioStore();

const rangeRef = ref<HTMLElement>();
const dotRef = ref<HTMLElement>();

/** 当前点位置 */
const progress = ref(0);
/** 是否处于按下状态 */
const down = ref(false);

nextTick(() => {
  progress.value = modelValue.value;
  dotRef.value!.style.left = `calc(${modelValue.value}% - ${
    dotRef.value!.offsetWidth * (modelValue.value / 100)
  }px)`;
});

const throttlePlayAudio = _throttle(() => {
  $audioStore.play("za86");
}, 50);

onMounted(() => {
  /** 存储鼠标按下时的 X 坐标 */
  let startX = 0;
  /** 存储鼠标按下时元素的 left 样式值 */
  let startLeft = 0;
  //步长
  const step = 1;
  const dot = dotRef.value!;

  const handleDown = (event: MouseEvent | TouchEvent) => {
    down.value = true;
    startLeft = dot.offsetLeft;

    if (event instanceof MouseEvent) {
      startX = event.clientX;
    } else if (event instanceof TouchEvent) {
      startX = event.touches[0].clientX;
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", handleUp, { once: true });
    window.addEventListener("touchend", handleUp, { once: true });
  };

  const handleMove = (event: MouseEvent | TouchEvent) => {
    const dot = dotRef.value!;
    const range = rangeRef.value!;

    // 计算鼠标移动的距离（当前 X 坐标 - 开始时的 X 坐标）
    let distX = 0;
    if (event instanceof MouseEvent) {
      distX = event.clientX - startX;
    } else if (event instanceof TouchEvent) {
      distX = event.touches[0].clientX - startX;
    }

    // 根据鼠标移动的距离计算元素的新的 left 值（百分比）
    let newLeftPercent = ((startLeft + distX) / (range.offsetWidth - dot.offsetWidth)) * 100;
    // 将新的 left 值调整为最接近的步长
    newLeftPercent = Math.round(newLeftPercent / step) * step;

    // 限制新的 left 值在 0% 到 100% 之间
    if (newLeftPercent < 0) newLeftPercent = 0;
    if (newLeftPercent > 100) newLeftPercent = 100;

    dot.style.left = `calc(${newLeftPercent}% - ${dot.offsetWidth * (newLeftPercent / 100)}px)`;
    progress.value = Math.abs(newLeftPercent);
    modelValue.value = progress.value;
    throttlePlayAudio();
  };

  const handleUp = () => {
    down.value = false;
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("touchmove", handleMove);
  };

  dot.addEventListener("mousedown", handleDown);
  dot.addEventListener("touchstart", handleDown);
});
</script>

<template>
  <div
    ref="rangeRef"
    class="k-range"
    :class="{ disabled: disabled }"
    :style="{
      width: width,
    }"
  >
    <div class="bar">
      <div
        class="line"
        :style="{
          width: progress + '%',
        }"
      ></div>
    </div>
    <div ref="dotRef" v-mouse-tip class="dot">
      <div class="slider-value">
        <span class="value" :class="{ 'show-num': down }" :style="{ left: progress + '%' }">
          {{ text || modelValue }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
