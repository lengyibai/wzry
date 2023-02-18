<script setup lang="ts" name="equip">
import { ref, onActivated } from "vue";

import EquipList from "./childComps/EquipList/index.vue"; //装备列表
import EquipDetail from "./childComps/EquipDetail/index.vue"; //装备详情

import equipStore from "@/store/equip";
import switchStore from "@/store/switch";

const $equipStore = equipStore();
const $switchStore = switchStore();

const equipList = ref();
const equipMain = ref();
const show = ref(false); //显示装备列表

/* 点击筛选后触发返回顶部 */
const EmitChangeFilter = () => {
  setTimeout(() => {
    equipMain.value.scroll({ top: 0 });
  }, 450);
};

/* 列表请求完毕之后显示装备分类侧边栏 */
$equipStore.getEquipList().then(() => {
  show.value = true;
});

onActivated(() => {
  $switchStore.$clickAudio("3k4s");
});
</script>

<template>
  <div class="equip">
    <transition name="fade">
      <div v-if="show" class="equip-main" ref="equipMain">
        <!-- 装备详情 -->
        <EquipDetail :show="$equipStore.show_details" :equip="$equipStore.active_data" />

        <!-- 装备列表 -->
        <EquipList ref="equipList" />
      </div>
    </transition>

    <!-- 装备侧边栏 -->
    <transition name="sidebar" appear>
      <FilterSidebar type="equip" @change="EmitChangeFilter" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
