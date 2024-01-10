<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import _debounce from "lodash/debounce";

import { SkinStore } from "@/store";
import { FilterGender, FilterTool, KInput } from "@/components/business";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

const $emit = defineEmits<{
  search: [];
}>();

const { sortPrice, filterSkinType, filterGender, searchSkin } = SkinStore();
const { price_type, skin_type } = storeToRefs(SkinStore());

const select_price = [
  { label: "全部价格", value: "全部价格" },
  { label: "免费", value: "免费" },
  { label: "由低到高", value: "由低到高" },
  { label: "由高到低", value: "由高到低" },
];

const select_type = [
  { label: "全部皮肤", value: "全部皮肤" },
  { label: "勇者", value: "勇者" },
  { label: "史诗", value: "史诗" },
  { label: "传说", value: "传说" },
  { label: "情侣", value: "情侣" },
  { label: "限定", value: "唯一限定" },
  { label: "世冠", value: "世冠" },
  { label: "FMVP", value: "FMVP" },
  { label: "五五节", value: "五五" },
  { label: "星传说", value: "星传说" },
  { label: "KPL限定", value: "KPL" },
  { label: "周年限定", value: "周年限定" },
  { label: "生肖限定", value: "年限定" },
  { label: "战令限定", value: "战令限定" },
  { label: "其他限定", value: "其他限定" },
  { label: "赛季专属", value: "赛季专属" },
  { label: "其他专属", value: "其他专属" },
  { label: "荣耀典藏", value: "荣耀典藏" },
  { label: "王者之证", value: "王者之证" },
  { label: "团战精神", value: "团战精神" },
  { label: "五虎上将", value: "五虎上将" },
  { label: "正版授权", value: "正版授权" },
  { label: "特殊标志", value: "特殊标志" },
];

/** 搜索值 */
const search_value = ref("");

/* 清空输入框 */
const clearName = () => {
  search_value.value = "";
};

/* 价格排序 */
const onPriceSort = (v: string | number) => {
  sortPrice(v as string);
  clearName();
};

/* 皮肤类型筛选 */
const onTypeFilter = (v: string | number) => {
  filterSkinType(v as string);
  clearName();
};

/* 设置性别 */
const onFilterGender = (type: Game.GenderId) => {
  filterGender(type);
  clearName();
};

/* 搜索皮肤 */
const debounceSearch = _debounce(() => {
  searchSkin(search_value.value);
  $emit("search");
}, 500);

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
        :data="select_type"
        :sort-text="skin_type"
        list-height="31.25rem"
        @select="onTypeFilter"
      />
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
      placeholder="皮肤/英雄"
      @input="debounceSearch"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
