<script setup lang="ts">
import { storeToRefs } from "pinia";

import Attribute from "./components/Attribute/index.vue";

import { HeroDetailStore } from "@/store";

const { hero_info } = storeToRefs(HeroDetailStore());
</script>

<template>
  <div class="hero-attributes">
    <Attribute attr="survival" :length="hero_info.survival" />
    <Attribute attr="attack" :length="hero_info.attack" />
    <Attribute attr="effect" :length="hero_info.effect" />
    <Attribute attr="difficulty" :length="hero_info.difficulty" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
