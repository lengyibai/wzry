<script setup lang="ts">
import { ref } from "vue";

import { AudioStore, EpigraphStore } from "@/store";
import { $concise } from "@/utils";

const $audioStore = AudioStore();
const $epigraphStore = EpigraphStore();

const { getImgLink } = $concise;

/** 顶部铭文分类标题 */
const epigraph: Record<string, Epigraph.Category>[] = [
  { title: "全部" },
  { title: "攻击" },
  { title: "生命" },
  { title: "防御" },
  { title: "功能" },
  { title: "吸血" },
  { title: "攻速" },
  { title: "暴击" },
  { title: "穿透" },
];

/** 当前点击的分类索引 */
const current_index = ref(0);

/* 点击分类标题 */
const handleToggle = (index: number, type: Epigraph.Category) => {
  //由于连续点击同样的音效名会触发重复，所以追加索引号实现唯一性
  $audioStore.play(`n4r4${index}`);
  current_index.value = index;
  //每次点击重新筛选数据
  $epigraphStore.setFilter(type);
};
</script>

<template>
  <div class="epigraph-tool">
    <div class="epigraph-category">
      <!-- 滑动的图标 -->
      <img
        :style="{ left: current_index * 11.11 + '%' }"
        :src="getImgLink('epigraph_active')"
        alt=""
      />

      <!-- 文字 -->
      <button
        v-for="(item, index) in epigraph"
        :key="index"
        class="title"
        :class="{ active: current_index === index }"
        @click="handleToggle(index, item.title)"
      >
        <span>{{ item.title }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
