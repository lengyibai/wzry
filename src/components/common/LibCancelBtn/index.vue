<template>
  <button
    class="lib-cancel-btn"
    @click="close"
    :style="{
      width: size,
      height: size,
    }"
  >
    <img class="close" v-show="show_up" src="./icon.svg" alt="" />
  </button>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  size: {
    type: String,
    default: "500px",
  },
});

const show_up = ref(true);

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>
<style scoped lang="less">
.lib-cancel-btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;

  &:hover {
    filter: saturate(2);
  }

  &:active {
    filter: brightness(0.75);
  }

  img {
    width: 75%;
    height: 75%;
    transition: all 0.5s;
  }
}
</style>
