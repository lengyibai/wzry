<template>
  <div class="HeroSidebar">
    <div class="hero-type cursor-pointer" :class="{ active: item.name === $heroStore.profession }" v-for="(item, index) in hero_type" @click="select(item.name, index)" :key="index">
      <span v-html="icon[item.icon]"></span>
      <span class="name cursor-pointer">{{ item.name }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import switchStore from '@/store/globalSwitch';
import heroStore from '@/store/hero';
import icon from '@/assets/icon/svg/sidebar';

const $switchStore = switchStore();
const $heroStore = heroStore();

const hero_type = [
  { name: '全部', icon: 'ALL' },
  { name: '坦克', icon: 'TANK' },
  { name: '战士', icon: 'WARRIOR' },
  { name: '刺客', icon: 'ASSASSIN' },
  { name: '法师', icon: 'MAGE' },
  { name: '射手', icon: 'STRIKER' },
  { name: '辅助', icon: 'ASSIST' },
];

const select = (name: string, index: number) => {
  $switchStore.$clickAudio(`默认${ index }`);
  $heroStore.setProfessional(name);
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
