<script setup lang="ts">
import { ref, watch } from "vue";
import { $deepCopy } from "@/utils";
import { equipDefault } from "@/defaultValue/defaults";
import equiqStore from "@/store/equip";
import EquipList from "./childComps/EquipList/index.vue"; //装备列表
import EquipDetail from "./childComps/EquipDetail/index.vue"; //装备详情
import EquipSidebar from "./childComps/EquipSidebar/index.vue"; //右侧边栏

const $equiqStore = equiqStore();

const equip_data = ref<typeof equipDefault | undefined>(
  $deepCopy(equipDefault)
); //被点击的装备信息
const show_Details = ref(false); //显示装备详情
const show_EquipSidebar = ref(false); //显示装备分类侧边栏

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
      <div class="equip-main" v-if="show_EquipSidebar">
        <EquipList />
        <EquipDetail :show="show_Details" :equip="equip_data" />
      </div>
    </transition>
    <transition name="sidebar">
      <EquipSidebar v-show="show_EquipSidebar" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
