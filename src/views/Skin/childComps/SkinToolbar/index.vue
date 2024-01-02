<script setup lang="ts">
import { ref, reactive, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import _debounce from "lodash/debounce";

import { SkinStore } from "@/store";
import { $bus } from "@/utils";
import { FilterGender, FilterTool, KInput } from "@/components/business";

const $emit = defineEmits<{
  seach: [];
}>();

const { sortPrice, filterSkinType, sortType, filterGender, searchSkin } = SkinStore();
const { price_type, sort_type, skin_type } = storeToRefs(SkinStore());

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

const sort_types = [
  { label: "正序", value: "正序" },
  { label: "倒序", value: "倒序" },
];

/** 当前展开的菜单 */
let current_index = -1;

/** 搜索值 */
const search_value = ref("");
/** 性别排序 */
const gender = ref<Game.GenderId>(0);
/** 记录展开状态 */
const select_status = reactive([false, false, false, false, false]);

/* 价格排序 */
const onPriceSort = (v: string | number) => {
  sortPrice(v as string);
};

/* 皮肤类型筛选 */
const onTypeFilter = (v: string | number) => {
  filterSkinType(v as string);
};

/* 正序/倒序 */
const onSortType = (v: string | number) => {
  sortType(v as string);
};

/* 设置性别 */
const handerSetGender = (type: Game.GenderId) => {
  gender.value = type;
  filterGender(type);
};

/** 搜索皮肤 */
const handSearch = _debounce(() => {
  searchSkin(search_value.value);
  $emit("seach");
}, 500);

/** 设置下拉状态 */
const handleSelectStatus = (i: number) => {
  //点击下拉菜单，先隐藏所有，再展开被点击的
  select_status.fill(false);

  //如果重复点击一个，则不做处理
  if (current_index === i) {
    current_index = -1;
    return;
  }

  select_status[i] = true;
  current_index = i;
};

$bus.on("mouseup", (e) => {
  const el = (e as MouseEvent).target as HTMLElement;

  //如果点击的不是下拉菜单，则隐藏
  if (!el.className.includes("select-filter")) {
    select_status.fill(false);
    current_index = -1;
  }
});

onUnmounted(() => {
  $bus.off("mouseup");
});
</script>

<template>
  <div class="skin-toolbar">
    <div class="filter-select">
      <!-- 价格排序 -->
      <FilterTool
        :status="select_status[0]"
        :data="select_price"
        :sort-text="price_type"
        @click="handleSelectStatus(0)"
        @select="onPriceSort"
      />

      <!-- 皮肤类型筛选 -->
      <FilterTool
        :status="select_status[1]"
        :data="select_type"
        :sort-text="skin_type"
        list-height="31.25rem"
        @click="handleSelectStatus(1)"
        @select="onTypeFilter"
      />

      <!-- 正序/倒序 -->
      <FilterTool
        :status="select_status[2]"
        :sort-text="sort_type"
        :data="sort_types"
        @click="handleSelectStatus(2)"
        @select="onSortType"
      />
    </div>

    <!-- 只看性别 -->
    <FilterGender @change="handerSetGender" />

    <!-- 搜索 -->
    <KInput v-model="search_value" placeholder="皮肤/英雄" @input="handSearch" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
