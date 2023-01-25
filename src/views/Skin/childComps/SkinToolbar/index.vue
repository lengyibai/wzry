<script setup lang="ts">
import { ref } from "vue";

import skinStore from "@/store/skin";

const $skinStore = skinStore();

const select_price = [
  { label: "默认价格", value: "默认价格" },
  { label: "免费", value: "免费" },
  { label: "价格由低到高", value: "价格由低到高" },
  { label: "价格由高到低", value: "价格由高到低" },
];

const select_type = [
  { label: "全部类型", value: "全部类型" },
  { label: "勇者", value: "勇者" },
  { label: "史诗", value: "史诗" },
  { label: "传说", value: "传说" },
  { label: "情侣", value: "情侣" },
  { label: "限定", value: "限定" },
  { label: "世冠", value: "世冠" },
  { label: "FMVP", value: "FMVP" },
  { label: "五五节", value: "五五节" },
  { label: "星传说", value: "星传说" },
  { label: "KPL限定", value: "KPL限定" },
  { label: "周年限定", value: "周年限定" },
  { label: "生肖限定", value: "生肖限定" },
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

const sort_type = [
  { label: "正序", value: "正序" },
  { label: "倒序", value: "倒序" },
];

const gender = ref(0); //性别排序
const search_value = ref(""); //搜索值

/* 价格排序 */
const EmitPriceSort = (v: string) => {
  $skinStore.sortPrice(v);
};

/* 皮肤类型筛选 */
const EmitTypeFilter = (v: string) => {
  $skinStore.filterType(v);
};

/* 正序/倒序 */
const EmitSortType = (v: string) => {
  $skinStore.sortType(v);
};

/* 设置性别 */
const handerSetGender = (type: number) => {
  gender.value = type;
  $skinStore.sortGender(type);
};

/** @description: 搜索皮肤 */
const handSearch = () => {
  $skinStore.searchSkin(search_value.value);
};
</script>

<template>
  <div class="skin-toolbar">
    <!-- 价格排序 -->
    <FilterTool v-model="$skinStore.price_type" :data="select_price" @select="EmitPriceSort" />

    <!-- 皮肤类型筛选 -->
    <FilterTool
      v-model="$skinStore.skin_type"
      :data="select_type"
      list-height="500px"
      @select="EmitTypeFilter"
    />

    <!-- 正序/倒序 -->
    <FilterTool
      v-model="$skinStore.sort_type"
      :data="sort_type"
      list-height="100px"
      @select="EmitSortType"
    />

    <!-- 只看性别 -->
    <FilterGender v-model="gender" @update:model-value="handerSetGender" />

    <!-- 搜索 -->
    <K-Input
      v-model="search_value"
      class="input"
      placeholder="皮肤/英雄"
      border-color="var(--theme-color-three)"
      color="var(--theme-color-five)"
      align="center"
      width="8em"
      font-size="24px"
      @input="handSearch"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
