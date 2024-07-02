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
const { sort_type, gender_type } = storeToRefs($atlasStore);

const sort_types = ["正序", "倒序"];

/** 搜索值 */
const search_value = ref("");

/** @description 清空输入框 */
const clearName = () => {
  search_value.value = "";
  $emit("change");
};

/** @description 正序/倒序
 * @param index 排序类型索引
 */
const onSortType = (index: number) => {
  $atlasStore.sortType(sort_types[index]);
  clearName();
};

/** @description 设置性别
 * @param type 性别标识符
 */
const onFilterGender = (type: Game.GenderId) => {
  $atlasStore.filterGender(type);
  clearName();
};

/** @description 搜索皮肤 */
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
      <FilterTool :sort-text="sort_type" :options="sort_types" @select="onSortType" />
    </div>

    <!-- 只看性别 -->
    <FilterGender v-model="gender_type" @update:model-value="onFilterGender" />

    <!-- 搜索 -->
    <SelectHeroAndSkin v-model="search_value" @change="onSearch" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
