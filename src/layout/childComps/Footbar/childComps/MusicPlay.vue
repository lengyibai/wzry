<script setup lang="ts">
import musicStore from "@/store/music";

const $musicStore = musicStore();

$musicStore.play();
</script>

<template>
  <transition name="music-play">
    <div
      class="music-play"
      :style="{ width: $musicStore.progress + '%' }"
    ></div>
  </transition>
</template>

<style scoped lang="less">
.music-play {
  width: 0%;
  height: 5px;
  background-color: var(--theme-color-five);
  transition: all var(--time-250) ease-out;
}
</style>
