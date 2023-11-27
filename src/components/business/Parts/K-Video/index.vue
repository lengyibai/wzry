<script setup lang="ts">
import { onMounted, ref } from "vue";

import { $tool } from "@/utils";

interface Props {
  /** 视频链接 */
  link: string;
  /** 静音 */
  muted?: boolean;
}
withDefaults(defineProps<Props>(), {
  muted: false,
});

const videoPlayer = ref<HTMLVideoElement>();

const play = async () => {
  try {
    if (!videoPlayer.value) return;
    await videoPlayer.value.play();
    videoPlayer.value.volume = 0.25;
  } catch (error) {
    setTimeout(() => {
      play();
    }, 1000);
  }
};

onMounted(play);
</script>

<template>
  <video
    ref="videoPlayer"
    autoplay
    :muted="muted || $tool.isPhone"
    :src="link"
    class="k-video"
    loop
  ></video>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
