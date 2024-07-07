<script setup lang="ts">
import { computed, ref } from "vue";

import EpigraphToolbar from "./components/EpigraphToolbar/index.vue";
import EpigraphList from "./components/EpigraphList/index.vue";

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

const epigraphToolbarRef = ref<InstanceType<typeof EpigraphToolbar>>();

/** 当前类别索引 */
const current_index = computed({
  get() {
    return epigraph.indexOf($epigraphStore.type);
  },
  set(index) {
    $epigraphStore.setFilter(epigraph[index]);
  },
});
</script>

<template>
  <!-- 铭文类型分类 -->
  <transition name="to-bottom" appear>
    <div class="tool">
      <EpigraphToolbar ref="epigraphToolbarRef" />
      <KCategory
        v-model="current_index"
        :options="epigraph"
        @update:model-value="epigraphToolbarRef?._clearName"
      />
    </div>
  </transition>

  <!-- 铭文列表 -->
  <EpigraphList />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
