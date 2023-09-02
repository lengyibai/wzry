<script setup lang="ts">
import EquipListColumn from "./childComps/EquipListColumn/index.vue";

import { EquipStore } from "@/store";

const $equipStore = EquipStore();
</script>

<template>
  <div ref="equipList" class="equip-list">
    <EquipListColumn
      :line-data="$equipStore.synthetic_id[0]"
      :equip-list="$equipStore.equip_list_column[0]"
      :index="0"
    />
    <EquipListColumn
      :line-data="$equipStore.synthetic_id[1]"
      :equip-list="$equipStore.equip_list_column[1]"
      :index="1"
    />
    <EquipListColumn
      :line-data="$equipStore.synthetic_id[2]"
      :equip-list="$equipStore.equip_list_column[2]"
      :index="2"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
