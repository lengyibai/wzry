<script setup lang="ts">
import { storeToRefs } from "pinia";

import Attribute from "./components/Attribute/index.vue";

import { HeroDetailStore } from "@/store";

const $heroDetailStore = HeroDetailStore();

const { hero_info } = storeToRefs($heroDetailStore);
</script>

<template>
  <div class="hero-attributes">
    <transition-group name="into" appear>
      <Attribute
        key="a"
        attr="survival"
        :style="{
          transitionDelay: '1s',
        }"
        :length="hero_info.survival"
      />
      <Attribute
        key="b"
        attr="attack"
        :style="{
          transitionDelay: '1.1s',
        }"
        :length="hero_info.attack"
      />
      <Attribute
        key="c"
        attr="effect"
        :style="{
          transitionDelay: '1.2s',
        }"
        :length="hero_info.effect"
      />
      <Attribute
        key="d"
        attr="difficulty"
        :style="{
          transitionDelay: '1.3s',
        }"
        :length="hero_info.difficulty"
      />
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
