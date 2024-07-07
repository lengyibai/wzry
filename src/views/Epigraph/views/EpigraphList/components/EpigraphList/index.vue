<script setup lang="ts">
import { ref, watch, nextTick } from "vue";

import EpigraphCard from "./components/EpigraphCard/index.vue";

import { LibGrid } from "@/components/common";
import { EpigraphStore } from "@/store";
import { useChangeListLineNum } from "@/hooks";

const $epigraphStore = EpigraphStore();

const { line_num } = useChangeListLineNum(5, [
  [2300, 5],
  [2000, 4],
  [1600, 3],
  [1110, 2],
  [550, 1],
]);

const epigraphListRef = ref<InstanceType<typeof LibGrid>>();

/** 淡入显示列表 */
const show = ref(false);
/** 铭文列表 */
const epigraph_list = ref<Game.Epigraph.Data[]>([]);

//每次修改更新列表
watch(
  () => $epigraphStore.filter_list,
  (v: Game.Epigraph.Data[]) => {
    show.value = false;
    nextTick(() => {
      epigraph_list.value = v;
      show.value = true;
    });
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <LibGrid
    v-if="show && epigraph_list.length"
    ref="epigraphListRef"
    :load-more="false"
    gap="0.9375rem"
    :count="line_num"
  >
    <transition-group name="card" appear>
      <EpigraphCard
        v-for="(item, index) in epigraph_list"
        :key="item.id"
        :data="item"
        class="epigraph-card"
        :style="{
          'transition-delay': 0.025 * index + 's',
        }"
      />
    </transition-group>
  </LibGrid>
</template>
