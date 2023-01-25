<script setup lang="ts">
import musicStore from "@/store/music";

const $musicStore = musicStore();

$musicStore.play();
</script>

<template>
  <transition name="music-play">
    <div class="music-play" :style="{ width: $musicStore.progress + '%' }"></div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
