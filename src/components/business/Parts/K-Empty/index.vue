<script setup lang="ts">
import { _getMiscLink } from "@/utils/concise";

interface Props {
  /** 提示文字 */
  tip: string;
  /** Y轴偏移量 */
  y?: string;
}

withDefaults(defineProps<Props>(), {
  y: "0",
});
</script>

<template>
  <div
    class="k-empty"
    :style="{
      top: `calc(50% + ${y})`,
    }"
  >
    <div
      class="icon"
      :style="{
        backgroundImage: `url(${_getMiscLink('warning')})`,
      }"
    ></div>
    <div class="text">{{ tip }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
