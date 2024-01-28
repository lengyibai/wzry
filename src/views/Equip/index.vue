<script setup lang="ts">
import { ref, onActivated } from "vue";

import EquipList from "./components/EquipList/index.vue";
import EquipDetail from "./components/EquipDetail/index.vue";

import { EquipStore, AudioStore } from "@/store";
import { FilterSidebar } from "@/components/business";
import { vScrollVirtualization } from "@/directives";

defineOptions({
  name: "Equip",
});

const $equipStore = EquipStore();
const $audioStore = AudioStore();

const equipListRef = ref<HTMLElement>();
const equipMainRef = ref<HTMLElement>();

$equipStore.getEquipList();

/* 点击筛选后触发返回顶部 */
const onChangeFilter = () => {
  setTimeout(() => {
    equipMainRef.value?.scroll({ top: 0 });
  }, 450);
};

onActivated(() => {
  $audioStore.play("ph23");
});
</script>

<template>
  <div class="equip">
    <transition name="fade" appear>
      <div ref="equipMainRef" v-scroll-virtualization class="equip__main">
        <!-- 装备详情 -->
        <EquipDetail :show="$equipStore.show_details" :equip="$equipStore.active_data" />

        <!-- 装备列表 -->
        <EquipList ref="equipListRef" />
      </div>
    </transition>

    <!-- 装备侧边栏 -->
    <FilterSidebar type="equip" @change="onChangeFilter" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
