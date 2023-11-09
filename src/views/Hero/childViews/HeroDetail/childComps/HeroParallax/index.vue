<script setup lang="ts">
import { toRefs } from "vue";

import { useBlurImageLoad } from "@/hooks";

interface Props {
  /** 背景图 */
  bg: string;
  /** 小图模糊加载 */
  blur: string;
}

const $props = defineProps<Props>();
const { bg, blur } = toRefs($props);

const { bg_img, finish } = useBlurImageLoad(bg, blur);
</script>

<template>
  <div
    class="hero-parallax"
    :style="{
      backgroundImage: 'url(' + bg_img + ')',
    }"
  >
    <transition name="fade">
      <div v-if="!finish" class="blur-mask"></div>
    </transition>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
