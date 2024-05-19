<script setup lang="ts">
import EpigraphToolbar from "./components/EpigraphToolbar/index.vue";
import EpigraphList from "./components/EpigraphList/index.vue";

import { vScrollVirtualization } from "@/directives";
import { KCategory } from "@/components/business";
import { EpigraphStore } from "@/store";

const $epigraphStore = EpigraphStore();

/** 顶部铭文分类标题 */
const epigraph: Game.Epigraph.Category[] = [
  "全部",
  "攻击",
  "生命",
  "防御",
  "功能",
  "吸血",
  "攻速",
  "暴击",
  "穿透",
];

/** @description 筛选
 * @param index 筛选分类索引
 */
const onTab = (index: number) => {
  $epigraphStore.setFilter(epigraph[index]);
};
</script>

<template>
  <!-- 铭文类型分类 -->
  <transition name="to-bottom" appear>
    <div class="tool">
      <EpigraphToolbar />
      <KCategory :options="epigraph" @tab="onTab" />
    </div>
  </transition>

  <!-- 铭文列表 -->
  <div v-scroll-virtualization class="epigraph-main">
    <EpigraphList />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
