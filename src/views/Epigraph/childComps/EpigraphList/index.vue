<template>
  <div>
    <transition name="card-list">
      <div class="epigraph-list" v-if="show">
        <LibGridLayout ref="epigraphListRef" v-if="epigraph_list.length" gap="15px" :count="count" :eqhMultiple="0.5">
          <transition-group name="card" appear>
            <div
              v-for="(item, index) in epigraph_list"
              :style="{
                'transition-delay': 0.025 * index + 's',
              }"
              :key="item.id"
            >
              <EpigraphCard :data="item" />
            </div>
          </transition-group>
        </LibGridLayout>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { onActivated, onBeforeUnmount, ref, watch, nextTick, onMounted } from "vue";
import $bus from "@/utils/eventBus";
import EpigraphCard from "./childComps/EpigraphCard/index.vue";

interface Props {
  data: Epigraph.Data[];
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
});

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

/* 进入页面后更新高度 */
onActivated(() => {
  nextTick(() => {
    epigraphListRef.value.updateHeight();
  }).catch(() => {});
});

onMounted(() => {
  /* 实时修改一行个数 */
  const change = [
    [1680, 3],
    [1340, 2],
    [1020, 1],
  ];
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
<style scoped lang="less">
@import url("./index.less");
</style>
