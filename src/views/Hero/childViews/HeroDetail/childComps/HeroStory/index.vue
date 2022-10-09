<template>
  <div class="HeroStory">
    <div class="title">TA的故事</div>
    <p class="content" v-html="hero_data.gamestory"></p>
    <div class="title">历史上的他</div>
    <p class="content" v-html="hero_data.history"></p>
  </div>
</template>
<script setup>
import heroStore from '@/store/hero.js';

const $heroStore = heroStore();
const hero_data = $heroStore.hero_info;
</script>
<style scoped lang="less">
.HeroStory {
  width: 100%;
  height: 100%;
  overflow: auto;
  color: var(--white);
  background-color: rgba(0, 0, 0, 0.5);
  .title {
    font-size: 50px;
    text-align: center;
    margin-top: 1em;
    text-shadow: var(--t-shadow);
  }
  .content {
    font-size: 26px;
    text-indent: 2em;
    padding: 2em;
    text-shadow: var(--t-shadow);
    :deep(p) {
      text-indent: inherit;
    }
    :deep(*) {
      font-size: inherit;
    }
  }
}
</style>
