<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

defineProps({
  video: {
    type: String,
    default: "",
  },
  muted: {
    type: Boolean,
    default: false,
  },
});

const videoPlayer = ref();

const play = () => {
  videoPlayer.value.play();
  document.body.removeEventListener("mousedown", play);
};

onMounted(() => {
  videoPlayer.value.volume = 0.5;
  document.body.addEventListener("mousedown", play);
});

onBeforeUnmount(() => {
  document.body.removeEventListener("mousedown", play);
});
</script>

<template>
  <div class="LibBgVideo">
    <video ref="videoPlayer" :muted="muted" :src="video" autoplay class="video" loop></video>
  </div>
</template>

<style scoped lang="less">
.LibBgVideo {
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;

  .video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
