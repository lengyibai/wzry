<template>
  <div>
    <audio @ended="ended" :src="link" ref="voice" hidden="true"></audio>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

defineProps({
  link: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['ended', 'info']);
const voice = ref();
const ended = () => {
  emit('ended');
};

onMounted(() => {
  voice.value.addEventListener('canplay', () => {
    emit('info', voice.value);
    voice.value.play();
  });
});
</script>
