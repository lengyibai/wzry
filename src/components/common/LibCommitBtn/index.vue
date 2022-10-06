<template>
  <div
    class="LibCommitBtn"
    @click.once="commit"
    :style="{
      width: size,
      height: size,
    }"
  >
    <img class="up" v-show="show_up" :class="{ move: status === 1 }" src="./img/fabu.svg" />
    <transition name="fade">
      <img v-show="!show_up && status === 1 && !finish" class="rotate" src="./img/loading.svg" />
    </transition>
    <transition name="bounce">
      <img v-show="finish" src="./img/success.svg" />
    </transition>
  </div>
</template>
<script setup>
import { ref } from 'vue';

defineProps({
  size: {
    type: String,
    default: '50px',
  },
  finish: {
    type: Boolean,
    default: false,
  },
});

const show_up = ref(true);
const status = ref(0);

const emit = defineEmits(['commit']);
const commit = () => {
  status.value = 1;
  setTimeout(() => {
    show_up.value = false;
    emit('commit');
  }, 750);
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
