<template>
  <div class="EquipSidebar">
    <div class="hero-type cursor-pointer" :class="{ active: item.name === $equipStore.type }" v-for="(item, index) in hero_type" @click="select(item.name, index)" :key="index">
      <span v-html="icon[item.icon]"></span>
      <span class="name cursor-pointer">{{ item.name }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import switchStore from '@/store/globalSwitch';
import equipStore from '@/store/equip';
import icon from '@/assets/icon/svg/sidebar';

interface HeroType {
  name: string;
  icon: string;
}

const hero_type: HeroType[] = [
  { name: '攻击', icon: 'ATTACK' },
  { name: '法术', icon: 'MAGIC' },
  { name: '防御', icon: 'DEFENSE' },
  { name: '移动', icon: 'MOVE' },
  { name: '打野', icon: 'JUNGLE' },
  { name: '游走', icon: 'MIGRATION' },
];

const $switchStore = switchStore();
const $equipStore = equipStore();

/* 点击侧边栏菜单，播放音效及存储菜单名 */
const select = (name: string, index: number) => {
  $switchStore.$clickAudio(`默认${ index }`);
  $equipStore.setType(name);
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
