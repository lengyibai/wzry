<script setup lang="ts">
import { MusicStore } from "@/store";

const $musicStore = MusicStore();
</script>

<template>
  <transition name="music-play">
    <div class="music-play" :style="{ width: $musicStore.progress + '%' }"></div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
