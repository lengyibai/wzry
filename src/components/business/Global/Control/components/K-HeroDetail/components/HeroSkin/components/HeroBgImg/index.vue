<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  /** 背景图组 */
  bgImg: string[];
  /** 用于切换 */
  toggle: boolean;
}

const $props = defineProps<Props>();

const animates = ["xmove", "square"];

const index = ref(0);

watch(
  () => $props.toggle,
  () => {
    if (animates.length - 1 === index.value) {
      index.value = 0;
      return;
    }
    index.value++;
  },
);
</script>

<template>
  <div class="hero-bg-img">
    <transition-group :name="animates[index]">
      <img v-if="bgImg[0]" v-show="toggle" key="a" class="bg" :src="bgImg[0]" alt="" />
      <img v-show="!toggle" key="b" class="bg" :src="bgImg[1]" alt="" />
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
