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
<script setup>
import heroStore from '@/store/hero';

const $heroStore = heroStore();
const hero_data = $heroStore.hero_info;
</script>
<style scoped lang="less">
.HeroMaterialAttribute {
  display: flex;
  opacity: 0;
  position: absolute;
  right: 0;
  flex-direction: column;
  height: 100%;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.5);
  animation: into 1s forwards;
  transform: translateZ(275px);
  transform-origin: right center;
  // animation: updownright 2.5s 1s infinite, into 1s;
  @keyframes updownright {
    0%,
    100% {
      transform: translateX(-185px) translateZ(275px) rotateY(-45deg) rotateX(10deg) scale(0.8);
    }
    50% {
      transform: translateX(-185px) translateY(-20px) translateZ(275px) rotateY(-45deg) rotateX(10deg) scale(0.8);
    }
  }
  @keyframes into {
    100% {
      opacity: 1;
      transform: translateX(-185px) translateZ(275px) rotateY(-45deg) rotateX(10deg) scale(0.8);
    }
  }
  .title {
    color: var(--white);
    font-size: 75px;
    margin-bottom: 15px;
    text-shadow: var(--t-shadow);
  }
  .HeroSort {
    margin-bottom: 25px;
  }
}
</style>
