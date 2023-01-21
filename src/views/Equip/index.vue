<script setup lang="ts">
import { ref, watch } from "vue";

import EquipList from "./childComps/EquipList/index.vue"; //装备列表
import EquipDetail from "./childComps/EquipDetail/index.vue"; //装备详情
import EquipSidebar from "./childComps/EquipSidebar/index.vue"; //右侧边栏

import { $deepCopy } from "@/utils";
import { equipDefault } from "@/defaultValue";
import equiqStore from "@/store/equip";
import switchStore from "@/store/switch";

const $equiqStore = equiqStore();
const $switchStore = switchStore();

const show_Details = ref(false); //显示装备详情
const show_EquipSidebar = ref(false); //显示装备分类侧边栏
const equip_data = ref<Equip.Data | undefined>($deepCopy(equipDefault)); //被点击的装备信息

$switchStore.$clickAudio("3k4s");

/* 列表请求完毕之后显示装备分类侧边栏 */
$equiqStore.getEquipList().then(() => {
  show_EquipSidebar.value = true;
});

/* 监听被点击装备的id，点击后更新装备详情 */
watch(
  () => $equiqStore.active_id,
  (v) => {
    show_Details.value = false; //隐藏装备详情，再延迟显示
    setTimeout(() => {
      equip_data.value = $equiqStore.equip_list.find((item) => {
        return item.id === v;
      });
      show_Details.value = true;
    }, 250);
  }
);
</script>

<template>
  <div class="equip">
    <transition name="fade">
      <div v-if="show_EquipSidebar" class="equip-main">
        <!-- 装备列表 -->
        <EquipList />

        <!-- 装备详情 -->
        <EquipDetail :show="show_Details" :equip="equip_data" />
      </div>
    </transition>

    <!-- 装备侧边栏 -->
    <transition name="sidebar">
      <EquipSidebar v-show="show_EquipSidebar" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
