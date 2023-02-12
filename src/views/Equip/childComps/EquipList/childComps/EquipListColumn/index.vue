<script setup lang="ts">
import { ref, watch } from "vue";

import EquipCard from "../common/EquipCard/index.vue"; //装备卡片

import equipStore from "@/store/equip";

interface Props {
  equipList: Equip.Data[];
  lineData: any[];
  index: number;
}
const props = defineProps<Props>();

const $equipStore = equipStore();

const card = ref();

const show = ref(true); //淡入显示列表
const equip_list = ref<Equip.Data[]>([]); //装备列表

/* 控制左右线条显示 */
const showLine = (id: number, line: string) => {
  return props.lineData.some((item) => {
    if (line === "left") {
      return item.id === id && props.index !== 0;
    } else {
      return item.id === id && props.index !== 2 && item.to;
    }
  });
};

/* 监听列表，实时更新列表 */
watch(
  () => $equipStore.category,
  () => {
    show.value = false;
    setTimeout(() => {
      equip_list.value = props.equipList;
      show.value = true;
    }, 300);
  }
);
</script>

<template>
  <div class="equip-list-primary" :style="{ opacity: show ? 1 : 0 }">
    <!-- 装备卡片列表 -->
    <EquipCard
      v-for="item in equip_list"
      :left-line="showLine(item.id, 'left')"
      :right-line="showLine(item.id, 'right')"
      :equip="item"
      ref="card"
      :key="item.id"
    />

    <!-- 右侧长竖线 -->
    <div
      v-if="index !== 0"
      class="vertical-line"
      :style="{
        top: $equipStore.vertical_line[index].top,
        height: $equipStore.vertical_line[index].height,
      }"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
