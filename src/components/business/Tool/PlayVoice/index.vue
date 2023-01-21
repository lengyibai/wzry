<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  link: string; //语音链接
}
withDefaults(defineProps<Props>(), {
  link: "",
});

interface Emits {
  (e: "ended"): void;
  (e: "info", voice: HTMLMediaElement): void;
}
const emit = defineEmits<Emits>();

const voice = ref();

/* 播放结束后触发 */
const ended = () => {
  emit("ended");
};

/* 播放语音 */
onMounted(() => {
  voice.value.addEventListener("canplay", () => {
    emit("info", voice.value as HTMLMediaElement);
    voice.value.play().catch(() => {});
  });
});
</script>

<template>
  <audio ref="voice" :src="link" hidden="true" @ended="ended"></audio>
</template>
