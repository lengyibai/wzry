<template>
  <div
    class="LibCancelBtn"
    @click="close"
    :style="{
      width: size,
      height: size,
    }"
  >
    <img class="close cursor-pointer" v-show="show_up" src="./icon.svg" alt="" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

defineProps({
  size: {
    type: String,
    default: '500px',
  },
});

const show_up = ref(true);

const emit = defineEmits(['close']);
const close = () => {
  emit('close');
};
</script>
<style scoped lang="less">
.LibCancelBtn {
  position: relative;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 75%;
    height: 75%;
    transition: all 0.5s;
  }
}
</style>
