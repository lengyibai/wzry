<script setup lang="ts">
import { computed } from "vue";

import { HeroDetailStore } from "@/store";

const $heroDetail = HeroDetailStore();

const hero = computed(() => $heroDetail.hero_info);
</script>

<template>
  <div class="hero-title">
    <div class="title-name">{{ hero.name }}</div>
    <div class="title-mark">
      <div class="left"></div>
      <span class="text">{{ hero.mark }}</span>
      <div class="right"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
