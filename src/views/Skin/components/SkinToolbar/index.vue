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
const { price_type, skin_type, skin_type_list, same_name, same_name_list, have_type, gender_type } =
  storeToRefs($skinStore);

const select_price = ["全部价格", "免费", "由低到高", "由高到低"];
const have_types = ["全部皮肤", "未拥有", "已拥有"];

/** 搜索值 */
const search_value = ref("");

/** @description 清空输入框 */
const clearName = () => {
  search_value.value = "";
  $emit("change");
};

/** @description 价格排序
 * @param index 类型索引
 */
const onPriceSort = (index: number) => {
  $skinStore.sortPrice(select_price[index]);
  clearName();
};

/** @description 皮肤类型筛选
 * @param index 类型索引
 */
const onTypeFilter = (index: number) => {
  $skinStore.filterSkinType(skin_type_list.value[index]);
  clearName();
};

/** @description 同名皮肤筛选
 * @param index 类型索引
 */
const onNameFilter = (index: number) => {
  $skinStore.filterSameName(same_name_list.value[index]);
  clearName();
};

/** @description 是否拥有排序
 * @param index 类型索引
 */
const onHaveType = (index: number) => {
  $skinStore.haveType(have_types[index]);
  clearName();
};

/** @description 设置性别
 * @param type 性别类型
 */
const onFilterGender = (type: Game.GenderId) => {
  $skinStore.filterGender(type);
  clearName();
};

/** @description 搜索皮肤 */
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
      <FilterTool :options="select_price" :sort-text="price_type" @select="onPriceSort" />

      <!-- 皮肤类型筛选 -->
      <FilterTool
        :options="skin_type_list"
        :sort-text="skin_type"
        list-height="31.25rem"
        min-width="8.5rem"
        @select="onTypeFilter"
      />

      <!-- 大于3个的同名皮肤 -->
      <FilterTool :options="same_name_list" :sort-text="same_name" @select="onNameFilter" />

      <!-- 拥有排序 -->
      <FilterTool :sort-text="have_type" :options="have_types" @select="onHaveType" />
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
