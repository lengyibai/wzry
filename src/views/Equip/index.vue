<script setup lang="ts" name="equip">
import { ref, watch, nextTick, onActivated } from "vue";

import EquipList from "./childComps/EquipList/index.vue"; //装备列表
import EquipDetail from "./childComps/EquipDetail/index.vue"; //装备详情

import { $deepCopy } from "@/utils";
import { equipDefault } from "@/default";
import equipStore from "@/store/equip";
import switchStore from "@/store/switch";

const $equipStore = equipStore();
const $switchStore = switchStore();

const equipList = ref();
const show = ref(false); //显示装备列表
const show_Details = ref(false); //显示装备详情
const equip_data = ref<Equip.Data>($deepCopy(equipDefault)); //被点击的装备信息

$switchStore.$clickAudio("3k4s");

/* 点击筛选后触发 */
const EmitChangeFilter = () => {
  equipList.value.backTop();
};

/* 列表请求完毕之后显示装备分类侧边栏 */
$equipStore.getEquipList().then(() => {
  show.value = true;
});

/* 监听被点击装备的id，点击后更新装备详情 */
watch(
  () => $equipStore.active_id,
  (v) => {
    show_Details.value = false; //隐藏装备详情，再延迟显示
    setTimeout(() => {
      equip_data.value = $equipStore.equip_list.find((item) => item.id === v)!;
      show_Details.value = true;
    }, 250);
  }
);

nextTick(() => {
  $equipStore.setEquipActive(111);
});
</script>

<template>
  <div class="equip">
    <transition name="fade">
      <div v-if="show" class="equip-main">
        <!-- 装备列表 -->
        <EquipList ref="equipList" />

        <!-- 装备详情 -->
        <EquipDetail :show="show_Details" :equip="equip_data" />
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
