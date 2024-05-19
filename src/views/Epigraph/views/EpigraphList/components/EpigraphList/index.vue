<script setup lang="ts">
import { ref, watch, nextTick, onActivated, onDeactivated, onMounted, onUnmounted } from "vue";

import EpigraphCard from "./components/EpigraphCard/index.vue";

import { LibGrid } from "@/components/common";
import { EpigraphStore } from "@/store";

const $epigraphStore = EpigraphStore();

/** 一行个数区间 */
const interval_count = [
  [2300, 5],
  [2000, 4],
  [1600, 3],
  [1110, 2],
  [550, 1],
];

const epigraphListRef = ref<InstanceType<typeof LibGrid>>();

/** 淡入显示列表 */
const show = ref(false);
/** 一行的个数 */
const count = ref(4);
/** 铭文列表 */
const epigraph_list = ref<Game.Epigraph.Data[]>([]);

/** @description 实时修改一行个数 */
const changeCount = () => {
  const v = document.documentElement.clientWidth;
  if (v > 2300) {
    count.value = 6;
  }
  for (const [a, b] of interval_count) {
    if (v < a) {
      count.value = b;
    }
  }
};

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

const addEventListener = () => {
  changeCount();
  window.addEventListener("resize", changeCount);
};

const removeEventListener = () => {
  window.removeEventListener("resize", changeCount);
};

onMounted(addEventListener);
onActivated(addEventListener);
onUnmounted(removeEventListener);
onDeactivated(removeEventListener);
</script>

<template>
  <div>
    <transition name="card-list">
      <LibGrid
        v-if="show && epigraph_list.length"
        ref="epigraphListRef"
        :load-more="false"
        gap="0.9375rem"
        :count="count"
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
    </transition>
  </div>
</template>
