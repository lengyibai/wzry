<script setup lang="ts">
import equipStore from "@/store/equip";
import EquipListColumn from "./childComps/EquipListColumn/index.vue"; //装备栏

const $equipStore = equipStore();
</script>

<template>
  <div class="equip-list">
    <EquipListColumn :lineData="$equipStore.synthetic_id[0]" :equipList="$equipStore.equip_list_column[0]" :index="0" />
    <EquipListColumn :lineData="$equipStore.synthetic_id[1]" :equipList="$equipStore.equip_list_column[1]" :index="1" />
    <EquipListColumn :lineData="$equipStore.synthetic_id[2]" :equipList="$equipStore.equip_list_column[2]" :index="2" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
