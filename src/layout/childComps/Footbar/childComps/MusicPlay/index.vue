<script setup lang="ts">
import { MusicStore } from "@/store";

const $musicStore = MusicStore();
</script>

<template>
  <div class="music-play" :style="{ width: $musicStore.progress + '%' }"></div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
