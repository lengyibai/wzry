<script setup lang="ts">
import { ref, watch } from "vue";

import switchStore from "@/store/switch";

interface Props {
  size?: string;
  finish?: boolean;
  modelValue: number;
}
const props = withDefaults(defineProps<Props>(), {
  size: "50px",
  modelValue: 0,
});

interface Emits {
  (e: "update:modelValue", v: number): void;
  (e: "commit"): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const show_up = ref(true); //显示纸飞机

/* 提交 */
const commit = () => {
  emit("update:modelValue", 1);
  setTimeout(() => {
    show_up.value = false;
    emit("commit");
  }, 750);
  $switchStore.$clickAudio("36jn");
};

watch(
  () => props.modelValue,
  (v) => {
    if (v === 0) {
      show_up.value = true;
    }
  }
);
</script>

<template>
  <div
    class="lib-commit-btn cursor-pointer"
    :style="{
      width: size,
      height: size,
    }"
    @click="commit"
  >
    <img v-show="show_up" class="up" :class="{ move: modelValue === 1 }" src="./img/fabu.svg" @dragstart.prevent />
    <transition name="fade">
      <img v-show="!show_up && modelValue === 1 && !finish" class="rotate" src="./img/loading.svg" @dragstart.prevent />
    </transition>
    <transition name="bounce">
      <img v-show="finish" src="./img/success.svg" @dragstart.prevent />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
