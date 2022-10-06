<template>
  <div class="EquipSidebar">
    <div
      class="hero-type cursor-pointer"
      :class="{ active: item.name === $equipStore.type }"
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
import switchStore from '@/store/globalSwitch.js';
import equipStore from '@/store/equip.js';
import icon from '@/assets/icon/svg/sidebar.js';

const hero_type = [
  { name: '攻击', icon: 'ATTACK' },
  { name: '法术', icon: 'MAGIC' },
  { name: '防御', icon: 'DEFENSE' },
  { name: '移动', icon: 'MOVE' },
  { name: '打野', icon: 'JUNGLE' },
  { name: '游走', icon: 'MIGRATION' },
];

const $switchStore = switchStore();
const $equipStore = equipStore();
const select = (name, index) => {
  $switchStore.$clickAudio(`默认${index}`);
  $equipStore.setType(name);
};
</script>
<style scoped lang="less">
.EquipSidebar {
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
