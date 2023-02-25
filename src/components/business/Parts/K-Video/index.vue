<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  video: string; //视频链接
  muted?: boolean; //静音
}
defineProps<Props>();

const videoPlayer = ref<HTMLVideoElement>();

const play = async () => {
  try {
    await videoPlayer.value?.play();
    videoPlayer.value!.volume = 0.25;
  } catch (error) {
    setTimeout(() => {
      play();
    }, 1000);
  }
};

onMounted(() => {
  play();
});
</script>

<template>
  <video :muted="muted" :src="video" autoplay class="video" loop ref="videoPlayer"></video>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
