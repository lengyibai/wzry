<script setup lang="ts">
interface Props {
  bg: string; //背景图
}
defineProps<Props>();
</script>

<template>
  <div
    class="hero-parallax"
    :style="{
      backgroundImage: 'url(' + bg + ')',
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
