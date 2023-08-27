<script setup lang="ts" name="equip">
import { ref, onActivated } from "vue";

import EquipList from "./childComps/EquipList/index.vue"; //装备列表
import EquipDetail from "./childComps/EquipDetail/index.vue"; //装备详情

import controlStore from "@/store/modules/control";
import equipStore from "@/store/modules/equip";

const $equipStore = equipStore();
const $controlStore = controlStore();

const equipList = ref();
const equipMain = ref();
const show = ref(false); //显示装备列表

/* 点击筛选后触发返回顶部 */
const onChangeFilter = () => {
  setTimeout(() => {
    equipMain.value.scroll({ top: 0 });
  }, 450);
};

/* 列表请求完毕之后显示装备分类侧边栏 */
$equipStore.getEquipList().then(() => {
  show.value = true;
});

onActivated(() => {
  $controlStore.$audioStore("3k4s");
});
</script>

<template>
  <div class="equip">
    <transition name="fade">
      <div v-if="show" ref="equipMain" class="equip-main">
        <!-- 装备详情 -->
        <EquipDetail :show="$equipStore.show_details" :equip="$equipStore.active_data" />

        <!-- 装备列表 -->
        <EquipList ref="equipList" />
      </div>
    </transition>

    <!-- 装备侧边栏 -->
    <transition name="sidebar" appear>
      <FilterSidebar type="equip" @change="onChangeFilter" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
