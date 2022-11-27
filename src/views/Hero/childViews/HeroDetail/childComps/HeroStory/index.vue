<template>
  <div class="hero-story">
    <div class="title">TA的故事</div>
    <p class="content" v-html="hero_data.gamestory"></p>
    <div class="title">历史上的他</div>
    <p class="content" v-html="hero_data.history"></p>
  </div>
</template>
<script setup lang="ts">
import heroStore from "@/store/hero";

const $heroStore = heroStore();
const hero_data = $heroStore.hero_info;
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
