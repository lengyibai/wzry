<template>
  <div class="HeroDetailBasicInfo" ref="HeroDetailBasicInfo">
    <div class="name">
      <span>{{ hero_data.name || '未知' }}</span>
      <div class="box">
        <span>{{ hero_data.mark || '未知' }}</span>
        <span>BACKGROUND</span>
      </div>
    </div>
    <div class="info" ref="info" v-for="(item, index) in hero_info" :key="index">
      <LibIcon :imgUrl="getImg(item[1])" right="5px" />{{ item[2] }}：{{ item[0] || '未知' }}
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

import heroStore from '@/store/hero.js';

const $heroStore = heroStore();
const hero_data = $heroStore.hero_info;

const HeroDetailBasicInfo = ref();
const hero_info = [
  [hero_data.location, 'location', '定位'],
  [hero_data.specialty, 'specialty', '特长'],
  [hero_data.period, 'period', '时期'],
  [hero_data.camp, 'camp', '阵营'],
  [hero_data.height, 'height', '身高'],
];
const getImg = (src) => {
  return new URL(`../../../../../../../../assets/img/svg/${src}.svg`, import.meta.url).href;
};

onMounted(() => {
  const list = HeroDetailBasicInfo.value.querySelectorAll('.info');
  list.forEach((item, index) => {
    item.style.transitionDelay = `${index / 10}s`;
    setTimeout(() => {
      item.style.transform = 'translateX(0)';
      item.style.opacity = 1;
    }, 250);
  });
});
</script>
<style scoped lang="less">
.HeroDetailBasicInfo {
  opacity: 0;
  position: absolute;
  height: 100%;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  animation: into 1s forwards;
  transform: translateZ(335px);
  transform-origin: left center;
  // animation: updownleft 2.5s 1s infinite, into 1s;
  @keyframes updownleft {
    0%,
    100% {
      transform: translateX(216px) translateY(0px) translateZ(335px) rotateY(45deg) rotateX(10deg) scale(0.8);
    }
    50% {
      transform: translateX(216px) translateY(-20px) translateZ(335px) rotateY(45deg) rotateX(10deg) scale(0.8);
    }
  }
  @keyframes into {
    100% {
      opacity: 1;
      transform: translateX(216px) translateY(0px) translateZ(335px) rotateY(45deg) rotateX(10deg) scale(0.8);
    }
  }
  .name {
    display: flex;
    margin-bottom: 25px;
    > span {
      color: var(--white);
      font-size: 75px;
      margin-right: 10px;
      text-shadow: var(--t-shadow);
    }
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        text-shadow: var(--t-shadow);
        &:nth-child(1) {
          color: var(--gray);
          font-size: 26px;
          margin-bottom: 10px;
        }
        &:nth-child(2) {
          color: var(--gray);
          font-size: 16px;
        }
      }
    }
  }
  .info {
    display: flex;
    color: var(--white);
    font-size: 26px;
    margin-bottom: 15px;
    transform: translateX(-100%);
    opacity: 0;
    transition: all 0.5s;
    text-shadow: var(--t-shadow);
  }
}
</style>
