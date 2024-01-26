<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { AtlasStore } from "@/store";
import { FilterGender, FilterTool, SelectHeroAndSkin } from "@/components/business";

const $emit = defineEmits<{
  /** 用于筛选后返回顶部 */
  change: [];
}>();

const $atlasStore = AtlasStore();

const { sort_type } = storeToRefs($atlasStore);

const sort_types = [
  { label: "正序", value: "正序" },
  { label: "倒序", value: "倒序" },
];

/** 搜索值 */
const search_value = ref("");

/* 清空输入框 */
const clearName = () => {
  search_value.value = "";
  $emit("change");
};

/* 正序/倒序 */
const onSortType = (v: string | number) => {
  $atlasStore.sortType(v as string);
  clearName();
};

/* 设置性别 */
const onFilterGender = (type: Game.GenderId) => {
  $atlasStore.filterGender(type);
  clearName();
};

/* 搜索皮肤 */
const onSearch = () => {
  $atlasStore.searchAtlas(search_value.value);
  $emit("change");
};

defineExpose({
  /** 清空输入框 */
  _clearName: clearName,
});
</script>

<template>
  <div class="savor-toolbar">
    <div class="filter-select">
      <!-- 正序/倒序 -->
      <FilterTool :sort-text="sort_type" :data="sort_types" @select="onSortType" />
    </div>

    <!-- 只看性别 -->
    <FilterGender @change="onFilterGender" />

    <!-- 搜索 -->
    <SelectHeroAndSkin v-model="search_value" @change="onSearch" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
