<template>
  <div class="LibBgVideo" v-parallax-video="parallaxSize">
    <video class="video" ref="videoPlayer" autoplay :src="video" loop></video>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({
  video: {
    type: String,
    default: '',
  },
  parallaxSize: {
    type: String,
    default: 'big',
  },
});

const videoPlayer = ref();
const play = () => {
  videoPlayer.value.play();
  document.body.removeEventListener('mousedown', play);
};

onMounted(() => {
  videoPlayer.value.volume = 0.5;
  document.body.addEventListener('mousedown', play);
});
onBeforeUnmount(() => {
  document.body.removeEventListener('mousedown', play);
});
</script>
<style scoped lang="less">
.LibBgVideo {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  inset: 0;
  transition: transform 0.25s ease-out;
  .video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
