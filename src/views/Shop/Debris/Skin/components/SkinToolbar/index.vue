<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import _debounce from "lodash/debounce";

import { SkinDebrisStore } from "@/store";
import FilterGender from "@/components/business/Tool/FilterGender/index.vue";
import FilterTool from "@/components/business/Tool/FilterTool/index.vue";
import { HELP_TIP, MOUSE_TIP } from "@/config";
import { KHelp, KInput } from "@/components/business";
import { vMouseTip } from "@/directives";
import { $help } from "@/utils/busTransfer";

const $emit = defineEmits<{
  /** 用于筛选后返回顶部 */
  change: [];
}>();

const $SkinDebrisStore = SkinDebrisStore();

const { price_type, skin_type_list, skin_type, same_name, same_name_list } =
  storeToRefs($SkinDebrisStore);

const select_price = ["全部价格", "由低到高", "由高到低"];

/** 搜索值 */
const search_value = ref("");

/* 清空输入框 */
const clearName = () => {
  search_value.value = "";
  $emit("change");
};

/* 价格排序 */
const onPriceSort = (index: number) => {
  $SkinDebrisStore.sortPrice(select_price[index]);
  clearName();
};

/* 皮肤类型筛选 */
const onTypeFilter = (index: number) => {
  $SkinDebrisStore.filterSkinType(skin_type_list.value[index]);
  clearName();
};

/* 同名皮肤筛选 */
const onNameFilter = (index: number) => {
  $SkinDebrisStore.filterSameName(same_name_list.value[index]);
  clearName();
};

/* 设置性别 */
const onFilterGender = (type: Game.GenderId) => {
  $SkinDebrisStore.filterGender(type);
  clearName();
};

/* 搜索皮肤 */
const debounceSearch = _debounce(() => {
  $SkinDebrisStore.searchSkin(search_value.value);
  $emit("change");
}, 500);

defineExpose({
  /** 清空输入框 */
  _clearName: clearName,
});

/* 点击帮助 */
const handleHelp = () => {
  $help({
    title: "碎片皮肤商店说明",
    content: HELP_TIP.kc45,
  });
};
</script>

<template>
  <div class="skin-toolbar">
    <div class="filter-select">
      <KHelp margin-right="0.5rem" @click="handleHelp" />

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
      :required="false"
      class="k-input"
      placeholder="英雄/皮肤"
      :no-special="false"
      @input="debounceSearch"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
