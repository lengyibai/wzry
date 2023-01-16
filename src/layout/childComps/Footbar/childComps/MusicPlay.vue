<template>
  <transition name="music-play">
    <div
      class="music-play"
      :style="{ width: $musicStore.progress + '%' }"
    ></div>
  </transition>
</template>
<script setup lang="ts">
import { watch } from "vue";
import musicStore from "@/store/music";

interface Props {
  playProgress: number;
}
const props = withDefaults(defineProps<Props>(), {
  playProgress: 0,
});

const $musicStore = musicStore();
$musicStore.play();

/* 监听底部点击 */
watch(
  () => props.playProgress,
  (v) => {
    $musicStore.setCurrentTime(v);
  }
);

/** @description: 播放音乐 */
// const play = () => {
//   $musicStore.play();
//   document.body.removeEventListener("mousedown", play);
// };
// play(); //如果从登录页过来，可直接播放背景音乐
// document.body.addEventListener("mousedown", play); //如果在管理页刷新，则需要点击才能播放
</script>
<style scoped lang="less">
.music-play {
  width: 0%;
  height: 5px;
  background-color: var(--theme-color-five);
  transition: all var(--time-250) ease-out;
}
</style>
