<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  video: string; //视频链接
  muted?: boolean; //静音
}
defineProps<Props>();

const videoPlayer = ref();

const play = () => {
  videoPlayer.value.play();
  document.body.removeEventListener("mousedown", play);
};

onMounted(() => {
  videoPlayer.value.volume = 0.5;
  document.body.addEventListener("mousedown", play);
});
</script>

<template>
  <video ref="videoPlayer" :muted="muted" :src="video" autoplay class="video" loop></video>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
