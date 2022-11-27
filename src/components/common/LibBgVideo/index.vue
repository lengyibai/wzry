<template>
  <div class="LibBgVideo">
    <video class="video" ref="videoPlayer" autoplay :src="video" loop></video>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

defineProps({
  video: {
    type: String,
    default: "",
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
<style scoped lang="less">
.LibBgVideo {
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  transition: transform 0.25s ease-out;
  inset: 0;

  .video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
