<template>
  <div
    class="LibDeleteBtn cursor-pointer"
    @click.once="add"
    :style="{
      width: size,
      height: size,
    }"
  >
    <div class="del" v-show="show_del">
      <img class="lid" :class="{ moveUp: status === 1 }" src="./img/lid.svg" />
      <img class="bucket" :class="{ moveDown: status === 1 }" src="./img/bucket.svg" />
    </div>
    <transition name="fade">
      <img v-show="!show_del && status === 1 && !finish" class="rotate" src="./img/loading.svg" />
    </transition>
    <transition name="bounce">
      <img v-show="finish" src="./img/success.svg" />
    </transition>
  </div>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  size: {
    type: String,
    default: "50px",
  },
  finish: {
    type: Boolean,
    default: false,
  },
});

const show_del = ref(true);
const status = ref(0);

const emit = defineEmits(["del"]);
const add = () => {
  status.value = 1;
  setTimeout(() => {
    show_del.value = false;
    emit("del");
  }, 250);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
