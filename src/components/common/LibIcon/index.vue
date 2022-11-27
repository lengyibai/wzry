<template>
  <div
    class="LibIcon"
    @mouseenter="toggle = true"
    @mouseleave="toggle = false"
    :style="{
      width: `${size}`,
      height: `${size}`,
      margin: `${top} ${right} ${bottom} ${left}`,
      backgroundImage: `url(${!toggle ? imgUrl : imgUrlHover || imgUrl})`,
    }"
    :title="title"
  ></div>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  imgUrl: {
    type: String,
    default: null,
  },
  imgUrlHover: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "25px",
  },
  top: {
    type: String,
    default: "0px",
  },
  right: {
    type: String,
    default: "0px",
  },
  bottom: {
    type: String,
    default: "0px",
  },
  left: {
    type: String,
    default: "0px",
  },
});

const toggle = ref(false);
</script>
<style scoped>
.LibIcon {
  position: relative;
  background: no-repeat center center;
  background-size: contain;
  cursor: pointer;
}
</style>
