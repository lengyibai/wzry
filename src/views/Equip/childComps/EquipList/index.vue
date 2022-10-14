<template>
  <div class="EquipList">
    <EquipListColumn :equipList="$equipStore.equip_list_column[0]" />
    <EquipListColumn :equipList="$equipStore.equip_list_column[1]" />
    <EquipListColumn :equipList="$equipStore.equip_list_column[2]" />
  </div>
</template>
<script setup>
import equipStore from '@/store/equip';
import EquipListColumn from './childComps/EquipListColumn/index.vue'; //装备栏

const $equipStore = equipStore();
</script>
<style scoped lang="less">
.EquipList {
  position: relative;
  flex: 1;
  display: flex;
  margin-right: 0px;
  overflow: auto;
}
</style>
