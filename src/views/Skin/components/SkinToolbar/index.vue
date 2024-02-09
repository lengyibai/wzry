<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { SkinStore } from "@/store";
import FilterGender from "@/components/business/Tool/FilterGender/index.vue";
import FilterTool from "@/components/business/Tool/FilterTool/index.vue";
import SelectHeroAndSkin from "@/components/business/Tool/SelectHeroAndSkin/index.vue";

const $emit = defineEmits<{
  /** 用于筛选后返回顶部 */
  change: [];
}>();

const $skinStore = SkinStore();

const { price_type, skin_type, same_name, same_name_list } = storeToRefs($skinStore);

const select_price = [
  { label: "全部价格", value: "全部价格" },
  { label: "免费", value: "免费" },
  { label: "由低到高", value: "由低到高" },
  { label: "由高到低", value: "由高到低" },
];

/** 搜索值 */
const search_value = ref("");

/* 清空输入框 */
const clearName = () => {
  search_value.value = "";
  $emit("change");
};

/* 价格排序 */
const onPriceSort = (v: string | number) => {
  $skinStore.sortPrice(v as string);
  clearName();
};

/* 皮肤类型筛选 */
const onTypeFilter = (v: string | number) => {
  $skinStore.filterSkinType(v as string);
  clearName();
};

/* 同名皮肤筛选 */
const onNameFilter = (v: string | number) => {
  $skinStore.filterSameName(v as string);
  clearName();
};

/* 设置性别 */
const onFilterGender = (type: Game.GenderId) => {
  $skinStore.filterGender(type);
  clearName();
};

/* 搜索皮肤 */
const onSearch = () => {
  $skinStore.searchSkin(search_value.value);
  $emit("change");
};

defineExpose({
  /** 清空输入框 */
  _clearName: clearName,
});
</script>

<template>
  <div class="skin-toolbar">
    <div class="filter-select">
      <!-- 价格排序 -->
      <FilterTool :data="select_price" :sort-text="price_type" @select="onPriceSort" />

      <!-- 皮肤类型筛选 -->
      <FilterTool
        :data="$skinStore.skin_type_list"
        :sort-text="skin_type"
        list-height="31.25rem"
        min-width="8.5rem"
        @select="onTypeFilter"
      />

      <!-- 大于3个的同名皮肤 -->
      <FilterTool :data="same_name_list" :sort-text="same_name" @select="onNameFilter" />
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
