<script setup lang="ts">
import { onUnmounted, ref } from "vue";

interface Props {
  /** 大小倍率 */
  rate?: number;
  /** 是否需要展示动画 */
  animate?: boolean;
  /** 嘴巴内壁色 */
  innerColor: string;
  /** 舌头色 */
  tongueColor: string;
}
const $props = withDefaults(defineProps<Props>(), {
  rate: 1,
  animate: true,
});

/** 眨眼计时器 */
let timer: NodeJS.Timeout;

/** 是否微笑 */
const smile = ref(false);

//眨眼动画
if ($props.animate) {
  timer = setInterval(() => {
    smile.value = !smile.value;
  }, 1500);
}

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div
    class="mouth"
    :class="{ smile }"
    :style="`--rate: ${rate};--inner-color:${innerColor};--tongue-color:${tongueColor};`"
  >
    <!-- 嘴巴内部 -->
    <div class="hole">
      <!-- 牙齿 -->
      <div class="teeth"></div>

      <!-- 舌头 -->
      <div class="tongue"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
