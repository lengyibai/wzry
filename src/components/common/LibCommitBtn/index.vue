<template>
  <div
    class="lib-commit-btn cursor-pointer"
    :style="{
      width: size,
      height: size,
    }"
    @click="commit"
  >
    <img
      v-show="show_up"
      class="up"
      :class="{ move: modelValue === 1 }"
      src="./img/fabu.svg"
    />
    <transition name="fade">
      <img
        v-show="!show_up && modelValue === 1 && !finish"
        class="rotate"
        src="./img/loading.svg"
      />
    </transition>
    <transition name="bounce">
      <img v-show="finish" src="./img/success.svg" />
    </transition>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "50px",
  },
  finish: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
});

const show_up = ref(true);
const emit = defineEmits(["commit", "update:modelValue"]);
const commit = () => {
  emit("update:modelValue", 1);
  setTimeout(() => {
    show_up.value = false;
    emit("commit");
  }, 750);
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
<style scoped lang="less">
@import url("./index.less");
</style>
