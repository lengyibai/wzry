<script setup lang="ts">
import { Store } from "@/store";

const $musicStore = Store.music();
</script>

<template>
  <transition name="music-play">
    <div class="music-play" :style="{ width: $musicStore.progress + '%' }"></div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
