<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  /** 视频链接 */
  link: string;
  /** 静音 */
  muted?: boolean;
}

const $props = withDefaults(defineProps<Props>(), {
  muted: false,
});

const videoPlayer = ref<HTMLVideoElement>();

/** @description 播放视频 */
const play = async () => {
  try {
    if (!videoPlayer.value) return;
    await videoPlayer.value.play();
    videoPlayer.value.volume = 0.25;
    videoPlayer.value.muted = $props.muted;
  } catch (error) {
    setTimeout(() => {
      play();
    }, 1000);
  }
};

watch(
  () => $props.muted,
  (v) => {
    videoPlayer.value && (videoPlayer.value.muted = v);
  },
);
</script>

<template>
  <video
    ref="videoPlayer"
    autoplay
    muted
    :src="link"
    class="k-video"
    @canplay="play"
    @ended="play"
  ></video>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
