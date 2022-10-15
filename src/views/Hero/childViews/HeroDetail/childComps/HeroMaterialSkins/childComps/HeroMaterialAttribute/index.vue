<template>
  <div class="HeroMaterialAttribute">
    <div class="title">英雄属性</div>
    <K-HeroSort class="HeroSort" :occ="hero_data.profession" />
    <K-Attribute attr="survival" :length="hero_data.survival" />
    <K-Attribute attr="attack" :length="hero_data.attack" />
    <K-Attribute attr="effect" :length="hero_data.effect" />
    <K-Attribute attr="difficulty" :length="hero_data.difficulty" />
  </div>
</template>
<script setup lang="ts">
import heroStore from '@/store/hero';

const $heroStore = heroStore();
const hero_data = $heroStore.hero_info;
</script>
<style scoped lang="less">
@import './index.less';
</style>
