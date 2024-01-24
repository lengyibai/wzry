<script setup lang="ts">
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import _debounce from "lodash/debounce";

import { HeroStore } from "@/store";
import { FilterGender, FilterTool, KInput } from "@/components/business";
import { LOCAL_TYPE } from "@/api";
import { vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";

const $emit = defineEmits<{
  /** 用于筛选后返回顶部 */
  change: [];
}>();

const $heroStore = HeroStore();

const { sort_type, attr_type, camp_type, misc_type, misc_sort } = storeToRefs($heroStore);

const select_attr = [
  { label: "全部属性", value: "全部属性" },
  { label: "非硬控", value: "非硬控" },
  { label: "免控", value: "免控" },
  { label: "回血", value: "回血" },
  { label: "真伤", value: "真伤" },
];
const select_misc = [
  { label: "全部筛选", value: "全部筛选" },
  { label: "团控", value: "团控" },
  { label: "无蓝条", value: "无蓝条" },
  { label: "非人类", value: "非人类" },
  { label: "多套技能", value: "多套技能" },
];
const select_sort = [
  { label: "全部排序", value: "全部排序" },
  { label: "身高", value: "身高" },
  { label: "上手难度", value: "上手难度" },
  { label: "皮肤数量", value: "皮肤数量" },
  { label: "关系数量", value: "关系数量" },
];
const sort_types = [
  { label: "正序", value: "正序" },
  { label: "倒序", value: "倒序" },
];

/** 搜索值 */
const search_value = ref("");
/** 阵营列表 */
const select_camp = reactive<Global.General[]>([]);

/* 获取阵营列表 */
LOCAL_TYPE.getTypeCampList().forEach((item) => {
  select_camp.push({
    label: item.value,
    value: item.value,
  });
});

/* 清空输入框 */
const clearName = () => {
  search_value.value = "";
  $emit("change");
};

/* 阵营筛选 */
const onSelectCamp = (v: string | number) => {
  $heroStore.filterCamp(v as string);
  clearName();
};

/* 属性筛选 */
const onSelectAttr = (v: string | number) => {
  $heroStore.filterAttr(v as string);
  clearName();
};

/* 杂项筛选 */
const onSelectMisc = (v: string | number) => {
  $heroStore.filterMisc(v as string);
  clearName();
};

/* 杂项排序 */
const onSelectSort = (v: string | number) => {
  $heroStore.sortMisc(v as string);
  clearName();
};

/* 正序/倒序 */
const onSortType = (v: string | number) => {
  $heroStore.sortType(v as string);
  clearName();
};

/* 性别切换 */
const onFilterGender = (name: Game.GenderId) => {
  $heroStore.filterGender(name);
  clearName();
};

/* 搜索英雄 */
const debounceSearch = _debounce(() => {
  $heroStore.searchHero(search_value.value);
  $emit("change");
}, 500);

defineExpose({
  /** 清空输入框 */
  _clearName: clearName,
});
</script>

<template>
  <div class="hero-toolbar">
    <div class="filter-select">
      <!-- 阵营筛选按钮 -->
      <FilterTool
        min-width="9.6106rem"
        :sort-text="camp_type"
        :data="select_camp"
        list-height="26.5625rem"
        @select="onSelectCamp"
      />

      <!-- 自带属性筛选按钮 -->
      <FilterTool :sort-text="attr_type" :data="select_attr" @select="onSelectAttr" />

      <!-- 杂项筛选按钮 -->
      <FilterTool :sort-text="misc_type" :data="select_misc" @select="onSelectMisc" />

      <!-- 杂项排序按钮 -->
      <FilterTool :sort-text="misc_sort" :data="select_sort" @select="onSelectSort" />

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
      class="k-input"
      placeholder="英雄/字母"
      :no-special="false"
      @input="debounceSearch"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
