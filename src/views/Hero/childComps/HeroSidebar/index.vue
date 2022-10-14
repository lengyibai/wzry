<template>
  <div class="HeroSidebar">
    <div
      class="hero-type cursor-pointer"
      :class="{ active: item.name === $heroStore.profession }"
      v-for="(item, index) in hero_type"
      @click="select(item.name, index)"
      :key="index"
    >
      <span v-html="icon[item.icon]"></span>
      <span class="name cursor-pointer">{{ item.name }}</span>
    </div>
  </div>
</template>
<script setup>
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

const select = (name, index) => {
  $switchStore.$clickAudio(`默认${index}`);
  $heroStore.setProfessional(name);
};
</script>
<style scoped lang="less">
.HeroSidebar {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  .hero-type {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: var(--theme-color-five);
    transition: all 0.25s;
    &:hover {
      color: var(--blue);
    }
    .name {
      font-size: 20px;
    }
    :deep(.icon) {
      width: 35px;
      height: 35px;
      margin-right: 20px;
    }
  }
}
.active {
  color: var(--white) !important;
  background-image: linear-gradient(135deg, rgba(34, 58, 94, 0) 25%, rgba(34, 130, 199, 0.25) 100%) !important;
}
</style>
