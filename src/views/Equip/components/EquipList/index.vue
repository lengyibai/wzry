<script setup lang="ts">
import { storeToRefs } from "pinia";

import EquipListColumn from "./components/EquipListColumn/index.vue";

import { EquipStore } from "@/store";

const $equipStore = EquipStore();

const { synthetic_id, equip_list_column } = storeToRefs($equipStore);
</script>

<template>
  <div ref="equipList" class="equip-list">
    <EquipListColumn :line-data="synthetic_id[0]" :equip-list="equip_list_column[0]" :index="0" />
    <EquipListColumn :line-data="synthetic_id[1]" :equip-list="equip_list_column[1]" :index="1" />
    <EquipListColumn :line-data="synthetic_id[2]" :equip-list="equip_list_column[2]" :index="2" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
