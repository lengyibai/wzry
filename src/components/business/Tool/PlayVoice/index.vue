<template>
  <audio @ended="ended" :src="link" ref="voice" hidden="true"></audio>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  link: string; //语音链接
}
interface Emits {
  (e: "ended"): void;
  (e: "info", voice: string): void;
}

withDefaults(defineProps<Props>(), {
  link: "",
});

const emit = defineEmits<Emits>();

const voice = ref();

/* 播放结束后触发 */
const ended = () => {
  emit("ended");
};

/* 组件一挂载就触发播放 */
onMounted(() => {
  voice.value.addEventListener("canplay", () => {
    emit("info", voice.value);
    voice.value.play().catch(() => {});
  });
});
</script>
