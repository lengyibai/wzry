<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import EquipCard from "./components/EquipCard/index.vue";

import { EquipStore } from "@/store";

interface Props {
  /** 装备列表 */
  equipList: Game.Equip.Data[];
  /** 线条数据 */
  lineData: {
    /** 装备id */
    id: number;
    /** 可合成的装备 */
    to?: Remote.Equip.Name[];
  }[];
  /** 列索引 */
  index: number;
}

const $props = defineProps<Props>();

const $equipStore = EquipStore();

const { category, vertical_line } = storeToRefs($equipStore);

const equipListRef = ref<HTMLElement>();

/** 淡入显示列表 */
const show = ref(true);
/** 装备列表 */
const equip_list = ref<Game.Equip.Data[]>([]);

/** @description 控制左右线条显示
 * @param id 装备id
 * @param line 装备图标左右两边连接线条
 */
const showLine = (id: number, line: string) => {
  return $props.lineData.some((item) => {
    if (line === "left") {
      return item.id === id && $props.index !== 0;
    } else {
      return item.id === id && $props.index !== 2 && item.to;
    }
  });
};

//监听列表，实时更新列表
watch(
  () => category.value,
  () => {
    show.value = false;
    setTimeout(() => {
      equip_list.value = $props.equipList;
      show.value = true;
    }, 300);
  },
);
</script>

<template>
  <div ref="equipListRef" class="equip-list-primary" :style="{ opacity: show ? 1 : 0 }">
    <!-- 装备卡片列表 -->
    <EquipCard
      v-for="item in equip_list"
      :key="item.id"
      :left-line="showLine(item.id, 'left')"
      :right-line="showLine(item.id, 'right')"
      :equip="item"
    />

    <!-- 右侧长竖线 -->
    <div
      v-if="index !== 0"
      class="vertical-line"
      :style="{
        top: vertical_line[index].top,
        height: vertical_line[index].height,
      }"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
