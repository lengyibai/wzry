<script setup lang="ts">
import { computed } from "vue";

import { HeroDetailStore } from "@/store";
import { CONFIG } from "@/config";

const $heroDetail = HeroDetailStore();

const hero = computed(() => $heroDetail.hero_info);
</script>

<template>
  <div class="hero-title">
    <div class="title-name">{{ hero.name }}</div>
    <div class="title-mark">
      <img class="left" :src="CONFIG.BASE.IMGBED + '/image/mark.png'" alt="" @dragstart.prevent />
      <span class="text">{{ hero.mark }}</span>
      <img class="right" :src="CONFIG.BASE.IMGBED + '/image/mark.png'" alt="" @dragstart.prevent />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
