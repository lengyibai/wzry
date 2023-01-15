<script setup lang="ts">
interface Props {
  name: string;
  mark: string;
}
withDefaults(defineProps<Props>(), {
  name: "未知",
  mark: "未知",
});

const IMGBED = window.IMGBED; //全局图床链接
</script>

<template>
  <div class="hero-title">
    <div class="title-name">{{ name }}</div>
    <div class="title-mark">
      <img class="left" :src="IMGBED + '/image/mark.png'" alt="" />
      <span class="text">{{ mark }}</span>
      <img class="right" :src="IMGBED + '/image/mark.png'" alt="" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
