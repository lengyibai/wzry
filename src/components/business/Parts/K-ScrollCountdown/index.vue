<script setup lang="ts">
import { computed } from "vue";

import NumScroll from "./components/NumScroll/index.vue";

interface Props {
  /** 倒计时数字 */
  nums: string[];
  /** 是否处于运行中 */
  running?: boolean;
  /** 单位 */
  unit?: "SEC" | "MIN" | "HOUR";
  /** 字体比例 */
  rate?: number;
}

const $props = withDefaults(defineProps<Props>(), {
  unit: "HOUR",
  running: true,
  rate: 1,
});

/** 通过索引号获取倒计时每个数字 */
const transform = computed(() => {
  return (index: number) => `translateY(-${$props.nums[index]}0%)`;
});
</script>

<template>
  <div class="k-scroll-countdown" :style="`--font-size-rate:${rate}`">
    <NumScroll :transform="transform(0)" />
    <NumScroll :transform="transform(1)" />
    <div
      v-if="unit !== 'SEC'"
      class="dot"
      :class="{
        running,
      }"
    >
      :
    </div>
    <NumScroll v-if="unit !== 'SEC'" :transform="transform(2)" />
    <NumScroll v-if="unit !== 'SEC'" :transform="transform(3)" />
    <div
      v-if="unit !== 'SEC' && unit !== 'MIN'"
      class="dot"
      :class="{
        running: running,
      }"
    >
      :
    </div>
    <NumScroll v-if="unit !== 'SEC' && unit !== 'MIN'" :transform="transform(4)" />
    <NumScroll v-if="unit !== 'SEC' && unit !== 'MIN'" :transform="transform(5)" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
