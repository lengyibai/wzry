<template>
  <div class="Equip">
    <transition name="fade">
      <div class="EquipMain" v-if="show_EquipSidebar">
        <EquipList />
        <EquipDetail :show="show_Details" :equip="equip" />
      </div>
    </transition>
    <transition name="sidebar">
      <EquipSidebar v-show="show_EquipSidebar" />
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import equiqStore from '@/store/equip.js';
import EquipList from './childComps/EquipList/index.vue'; //装备列表
import EquipDetail from './childComps/EquipDetail/index.vue'; //装备详情
import EquipSidebar from './childComps/EquipSidebar/index.vue'; //右侧边栏

const show_EquipSidebar = ref(false); //显示装备分类侧边栏

const $equiqStore = equiqStore();

const show_Details = ref(false); //显示装备详情
const equip = ref({}); //被点击的装备信息

$equiqStore.getEquipList().then(() => {
  show_EquipSidebar.value = true;
});

watch(
  () => $equiqStore.active_id,
  (v) => {
    show_Details.value = false;
    setTimeout(() => {
      if (v === 0) {
        equip.value = {};
      } else {
        equip.value = $equiqStore.equip_list.find((item) => {
          return item.id === v;
        });
      }
      show_Details.value = true;
    }, 250);
  },
);
</script>
<style scoped lang="less">
.Equip {
  width: 100%;
  height: 100%;
  display: flex;
  .EquipMain {
    position: relative;
    flex: 1;
    display: flex;
    height: 100%;
    padding-right: calc(25px * 8);
  }
}
</style>
