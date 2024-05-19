<script setup lang="ts">
interface Props {
  /** 大小倍率 */
  rate?: number;
  /** 背景色 */
  bgColor: string;
}
withDefaults(defineProps<Props>(), { rate: 1 });
</script>

<template>
  <div class="blush" :style="`--rate: ${rate};--bg-color:${bgColor}`"></div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
