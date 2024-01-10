<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import _debounce from "lodash/debounce";

import { AtlasStore } from "@/store";
import { FilterGender, FilterTool, KInput } from "@/components/business";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

const $emit = defineEmits<{
  search: [];
}>();

const { sortType, filterGender, searchAtlas } = AtlasStore();
const { sort_type } = storeToRefs(AtlasStore());

const sort_types = [
  { label: "正序", value: "正序" },
  { label: "倒序", value: "倒序" },
];

/** 搜索值 */
const search_value = ref("");

/* 清空输入框 */
const clearName = () => {
  search_value.value = "";
};

/* 正序/倒序 */
const onSortType = (v: string | number) => {
  sortType(v as string);
  clearName();
};

/* 设置性别 */
const onFilterGender = (type: Game.GenderId) => {
  filterGender(type);
  clearName();
};

/* 搜索皮肤 */
const debounceSearch = _debounce(() => {
  searchAtlas(search_value.value);
  $emit("search");
}, 500);

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
    <KInput
      v-model="search_value"
      v-mouse-tip="{
        text: MOUSE_TIP.kb43,
        type: 'INPUT',
      }"
      placeholder="英雄/皮肤"
      @input="debounceSearch"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
