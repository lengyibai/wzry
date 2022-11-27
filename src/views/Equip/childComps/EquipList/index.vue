<template>
  <div class="equip-list">
    <EquipListColumn :equipList="$equipStore.equip_list_column[0]" />
    <EquipListColumn :equipList="$equipStore.equip_list_column[1]" />
    <EquipListColumn :equipList="$equipStore.equip_list_column[2]" />
  </div>
</template>
<script setup lang="ts">
import equipStore from "@/store/equip";
import EquipListColumn from "./childComps/EquipListColumn/index.vue"; //装备栏

const $equipStore = equipStore();
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
