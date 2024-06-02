<script setup lang="ts">
import { vAnimateNumber } from "@/directives";
import { _formatKilobitNumber } from "@/utils/tool";

interface Props {
  /** 长数字 */
  value: number;
  /** 字体大小 */
  fontSize: string;
  /** 阴影 */
  textShadow?: string;
}
withDefaults(defineProps<Props>(), {
  textShadow: "var(--t-shadow-e)",
});
</script>

<template>
  <div
    v-if="value < 1000"
    v-animate-number="{
      num: value,
      duration: 2000,
      once: false,
    }"
    class="k-long-num"
    :style="{
      fontSize,
      textShadow,
    }"
  ></div>
  <div
    v-else
    class="k-long-num"
    :style="{
      fontSize,
      textShadow,
    }"
  >
    {{ _formatKilobitNumber(value) }}
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
