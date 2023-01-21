<script setup lang="ts">
interface Props {
  name: string; //名字
  mark: string; //代号
}
defineProps<Props>();

const IMGBED = window.IMGBED; //全局图床链接
</script>

<template>
  <div class="hero-title">
    <div class="title-name">{{ name }}</div>
    <div class="title-mark">
      <img
        class="left"
        :src="IMGBED + '/image/mark.png'"
        alt=""
        @dragstart.prevent
      />
      <span class="text">{{ mark }}</span>
      <img
        class="right"
        :src="IMGBED + '/image/mark.png'"
        alt=""
        @dragstart.prevent
      />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
