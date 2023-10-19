<script setup lang="ts">
import { ref, onActivated } from "vue";

import EquipList from "./childComps/EquipList/index.vue";
import EquipDetail from "./childComps/EquipDetail/index.vue";

import { EquipStore, AudioStore } from "@/store";

defineOptions({
  name: "equip",
});

const $equipStore = EquipStore();
const $audioStore = AudioStore();

const equipListRef = ref<HTMLElement>();
const equipMainRef = ref<HTMLElement>();

/** 显示装备列表 */
const show = ref(false);

/* 点击筛选后触发返回顶部 */
const onChangeFilter = () => {
  setTimeout(() => {
    equipMainRef.value?.scroll({ top: 0 });
  }, 450);
};

/* 列表请求完毕之后显示装备分类侧边栏 */
$equipStore.getEquipList().then(() => {
  show.value = true;
});

onActivated(() => {
  $audioStore.play("3k4s");
});
</script>

<template>
  <div class="equip">
    <transition name="fade">
      <div v-if="show" ref="equipMainRef" class="equip-main">
        <!-- 装备详情 -->
        <EquipDetail :show="$equipStore.show_details" :equip="$equipStore.active_data" />

        <!-- 装备列表 -->
        <EquipList ref="equipListRef" />
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
