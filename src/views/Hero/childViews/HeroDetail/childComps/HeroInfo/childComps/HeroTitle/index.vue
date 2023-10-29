<script setup lang="ts">
import { computed } from "vue";

import { HeroDetailStore } from "@/store";
import { $concise } from "@/utils";

const $heroDetail = HeroDetailStore();

const { getImgLink } = $concise;

const hero = computed(() => $heroDetail.hero_info);
</script>

<template>
  <div class="hero-title">
    <div class="title-name">{{ hero.name }}</div>
    <div class="title-mark">
      <img class="left" :src="getImgLink('mark')" alt="" />
      <span class="text">{{ hero.mark }}</span>
      <img class="right" :src="getImgLink('mark')" alt="" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
