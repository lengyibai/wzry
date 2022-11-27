<template>
  <div class="hero-material-attribute">
    <div class="title">英雄属性</div>
    <HeroSort class="hero-sort" :occ="hero_data.profession" />
    <Attribute attr="survival" :length="hero_data.survival" />
    <Attribute attr="attack" :length="hero_data.attack" />
    <Attribute attr="effect" :length="hero_data.effect" />
    <Attribute attr="difficulty" :length="hero_data.difficulty" />
  </div>
</template>
<script setup lang="ts">
import heroStore from "@/store/hero";
import Attribute from "./childComps/Attribute/index.vue";
import HeroSort from "./childComps/HeroSort/index.vue";

const $heroStore = heroStore();
const hero_data = $heroStore.hero_info;
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
