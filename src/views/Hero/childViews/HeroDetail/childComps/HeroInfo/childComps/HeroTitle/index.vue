<script setup lang="ts">
import { computed } from "vue";

import { heroDetailStore } from "@/store";

const $heroDetail = heroDetailStore();

const IMGBED = window.IMGBED; //全局图床链接

const hero = computed(() => $heroDetail.hero_info);
</script>

<template>
  <div class="hero-title">
    <div class="title-name">{{ hero.name }}</div>
    <div class="title-mark">
      <img class="left" :src="IMGBED + '/image/mark.png'" alt="" @dragstart.prevent />
      <span class="text">{{ hero.mark }}</span>
      <img class="right" :src="IMGBED + '/image/mark.png'" alt="" @dragstart.prevent />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
