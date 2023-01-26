<script setup lang="ts">
import { onBeforeUnmount, ref, watch, nextTick, onMounted } from "vue";

import EpigraphCard from "./childComps/EpigraphCard/index.vue";

import $bus from "@/utils/eventBus";

interface Props {
  data: Epigraph.Data[]; //铭文列表
}
const props = defineProps<Props>();

const epigraphListRef = ref();

const show = ref(false); //淡入显示列表
const count = ref(4); //一行的个数
const epigraph_list = ref<Epigraph.Data[]>([]); //铭文列表

/* 每次修改更新列表 */
watch(
  () => props.data,
  (v: Epigraph.Data[]) => {
    show.value = false;
    nextTick(() => {
      epigraph_list.value = v;
      show.value = true;
    });
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  /* 实时修改一行个数 */
  const change = [
    [1680, 3],
    [1340, 2],
    [1020, 1],
  ];

  /* 修改个数 */
  const changeCount = () => {
    const v = document.documentElement.clientWidth;
    if (v > 1680) {
      count.value = 4;
    }
    for (const [a, b] of change) {
      if (v < a) {
        count.value = b;
      }
    }
  };
  changeCount();

  $bus.on("resize", () => {
    changeCount();
  });
});

onBeforeUnmount(() => {
  $bus.off("resize");
});
</script>

<template>
  <div>
    <transition name="card-list">
      <LibGridLayout
        v-if="show && epigraph_list.length"
        ref="epigraphListRef"
        class="epigraph-list"
        gap="15px"
        :count="count"
      >
        <transition-group name="card" appear>
          <div
            v-for="(item, index) in epigraph_list"
            :key="item.id"
            class="epigraph-card"
            :style="{
              'transition-delay': 0.025 * index + 's',
            }"
          >
            <EpigraphCard :data="item" />
          </div>
        </transition-group>
      </LibGridLayout>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
