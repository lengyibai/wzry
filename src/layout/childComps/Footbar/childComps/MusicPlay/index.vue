<script setup lang="ts">
import { musicStore } from "@/store";

const $musicStore = musicStore();
</script>

<template>
  <transition name="music-play">
    <div class="music-play" :style="{ width: $musicStore.progress + '%' }"></div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
