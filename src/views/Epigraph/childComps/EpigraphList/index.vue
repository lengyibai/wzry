<script setup lang="ts">
import { ref, watch, nextTick, onActivated, onDeactivated } from "vue";

import EpigraphCard from "./childComps/EpigraphCard/index.vue";

import { LibGrid } from "@/components/common";

interface Props {
  /** 铭文列表 */
  data: Epigraph.Data[];
}

const $props = defineProps<Props>();

/** 一行个数区间 */
const interval_count = [
  [2300, 5],
  [2000, 4],
  [1600, 3],
  [1110, 2],
  [760, 1],
];

const epigraphListRef = ref<InstanceType<typeof LibGrid>>();

/** 淡入显示列表 */
const show = ref(false);
/** 一行的个数 */
const count = ref(4);
/** 铭文列表 */
const epigraph_list = ref<Epigraph.Data[]>([]);

/* 实时修改一行个数 */
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

/* 每次修改更新列表 */
watch(
  () => $props.data,
  (v: Epigraph.Data[]) => {
    show.value = false;
    nextTick(() => {
      epigraph_list.value = v;
      show.value = true;
    });
  },
  { deep: true, immediate: true },
);

onActivated(() => {
  changeCount();
  window.addEventListener("resize", changeCount);
});

onDeactivated(() => {
  window.removeEventListener("resize", changeCount);
});
</script>

<template>
  <div>
    <transition name="card-list">
      <LibGrid
        v-if="show && epigraph_list.length"
        ref="epigraphListRef"
        :load-more="false"
        gap="15px"
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
