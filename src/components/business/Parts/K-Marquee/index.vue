<script setup lang="ts">
import { nextTick, ref } from "vue";

interface Props {
  /** 是否处于播放状态 */
  playing: boolean;
  /** 移动一次消耗时间s */
  duration?: number;
  /** 容器宽度 */
  width?: string;
  /** 容器高度 */
  height?: string;
  /** 是否循环 */
  loop?: boolean;
  /** 水平对齐方式 */
  align?: "left" | "center";
}

withDefaults(defineProps<Props>(), {
  width: "100%",
  height: "100%",
  duration: 5,
  loop: false,
  align: "center",
});

const marqueeRef = ref<HTMLElement>();
const moveBoxRef = ref<HTMLElement>();

/** 内容是否大于父元素宽度 */
const is_over = ref(true);
/** 延迟设置溢出省略号 */
const can_set = ref(false);

nextTick(() => {
  is_over.value = moveBoxRef.value!.offsetWidth > marqueeRef.value!.offsetWidth;
  can_set.value = true;
});
</script>

<template>
  <div
    ref="marqueeRef"
    class="k-marquee"
    :class="{
      playing: playing,
    }"
    :style="{
      width,
      height,
    }"
  >
    <div
      ref="moveBoxRef"
      class="move-box"
      :class="{
        playing: playing,
        static: !playing && can_set,
      }"
      :style="{
        width: is_over ? 'fit-content' : '100%',
        textAlign: align,
        animationDuration: duration + 's',
        animationIterationCount: loop ? 'infinite' : '1',
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
