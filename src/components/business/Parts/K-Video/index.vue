<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  /** 视频链接 */
  video: string;
  /** 静音 */
  muted?: boolean;
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
  <video ref="videoPlayer" :muted="muted" :src="video" autoplay class="k-video" loop></video>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
