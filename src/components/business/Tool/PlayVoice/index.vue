<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  /** 语音链接 */
  link: string;
}

defineProps<Props>();
const $emit = defineEmits<{
  ended: [];
  info: [voice: HTMLMediaElement];
}>();

const voice = ref<HTMLMediaElement>();

/* 播放结束后触发 */
const ended = () => {
  $emit("ended");
};

/* 播放语音 */
onMounted(() => {
  voice.value && (voice.value.volume = 0.5);
  voice.value?.addEventListener("canplay", () => {
    $emit("info", voice.value as HTMLMediaElement);
    voice.value?.play();
  });
});
</script>

<template>
  <audio ref="voice" :src="link" hidden="true" @ended="ended"></audio>
</template>
