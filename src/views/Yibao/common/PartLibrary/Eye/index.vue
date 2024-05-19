<script setup lang="ts">
interface Props {
  /** 大小倍率 */
  rate?: number;
  /** 是否需要展示动画 */
  animate?: boolean;
  /** 虹膜渐变色 */
  colors: string[];
}
withDefaults(defineProps<Props>(), {
  rate: 1,
  animate: true,
});
</script>

<template>
  <!-- 眼睛 -->
  <div
    class="eye"
    :style="`--rate: ${rate};--iris-color-one:${colors[0]};--iris-color-two:${colors[1]};`"
    :class="{
      animate,
    }"
  >
    <!-- 虹膜 -->
    <div class="iris">
      <!-- 瞳孔 -->
      <div class="pupil"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
