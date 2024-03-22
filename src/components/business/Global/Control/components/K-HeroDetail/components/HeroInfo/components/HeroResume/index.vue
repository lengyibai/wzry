<script setup lang="ts">
import { computed } from "vue";

import { HeroDetailStore } from "@/store";
import { vTypewriterMultiple } from "@/directives";

const $heroDetail = HeroDetailStore();

const hero = computed(() => $heroDetail.hero_info);
</script>

<template>
  <div
    v-typewriter-multiple="{
      speed: 25,
      content: hero.resume,
    }"
    class="hero-resume"
  ></div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
