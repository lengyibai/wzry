<script setup lang="ts">
import { watch } from "vue";
import { onMounted, ref, watchEffect } from "vue";

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

onMounted(play);
</script>

<template>
  <video ref="videoPlayer" autoplay muted :src="link" class="k-video" loop></video>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
