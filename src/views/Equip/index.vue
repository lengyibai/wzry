<template>
  <div class="Equip">
    <transition name="fade">
      <div class="EquipMain" v-if="show_EquipSidebar">
        <EquipList />
        <EquipDetail />
      </div>
    </transition>
    <transition name="sidebar">
      <EquipSidebar v-show="show_EquipSidebar" />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getEquip } from '@/api/main/other/equip/index.js';
import equiqStore from '@/store/equip.js';
import switchStore from '@/store/globalSwitch.js';
import EquipList from './childComps/EquipList/index.vue'; //装备列表
import EquipDetail from './childComps/EquipDetail/index.vue'; //装备详情
import EquipSidebar from './childComps/EquipSidebar/index.vue'; //右侧边栏

const show_EquipSidebar = ref(false); //显示装备分类侧边栏

const $switchStore = switchStore();
const $equiqStore = equiqStore();
$switchStore.$loading.show('正在请求装备列表');
getEquip().then(async (res) => {
  await $switchStore.$loading.close();
  $equiqStore.setEquipList(res);
  show_EquipSidebar.value = true;
});
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
