<script setup lang="ts">
import { ref, reactive, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

import { API_HERO } from "@/api";
import { HeroStore } from "@/store";
import { $bus } from "@/utils";

const { filterGender, filterCamp, filterAttr, filterMisc, sortMisc, sortType, searchHero } =
  HeroStore();
const { sort_type, attr_type, camp_type, misc_type, misc_sort } = storeToRefs(HeroStore());

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
/** 当前展开的菜单 */
const current_index = ref(-1);
/** 记录展开状态 */
const select_status = reactive([false, false, false, false, false]);
/** 阵营列表 */
const select_camp = reactive([{ label: "全部阵营", value: "全部阵营" }]);

/* 获取阵营列表 */
API_HERO.getCampType().then((res) => {
  res.forEach((item) => {
    select_camp.push({
      label: item.name,
      value: item.name,
    });
  });
});

/* 阵营筛选 */
const onSelectCamp = (v: string | number) => {
  filterCamp(v as string);
};

/* 属性筛选 */
const onSelectAttr = (v: string | number) => {
  filterAttr(v as string);
};

/* 杂项筛选 */
const onSelectMisc = (v: string | number) => {
  filterMisc(v as string);
};

/* 杂项排序 */
const onSelectSort = (v: string | number) => {
  sortMisc(v as string);
};

/* 正序/倒序 */
const onSortType = (v: string | number) => {
  sortType(v as string);
};

/** 搜索英雄 */
const handSearch = () => {
  searchHero(search_value.value);
};

/** 设置下拉状态 */
const handleSelectStatus = (i: number) => {
  //点击下拉菜单，先隐藏所有，再展开被点击的
  select_status.fill(false);

  //如果重复点击一个，则不做处理
  if (current_index.value === i) {
    current_index.value = -1;
    return;
  }
  select_status[i] = true;
  current_index.value = i;
};

$bus.on("mouseup", (e) => {
  const el = (e as MouseEvent).target as HTMLElement;
  //如果点击的不是下拉菜单，则隐藏
  if (!el.className.includes("select-filter")) {
    select_status.fill(false);
    current_index.value = -1;
  }
});

onUnmounted(() => {
  $bus.off("mouseup");
});
</script>

<template>
  <div class="hero-toolbar">
    <div class="filter-select">
      <!-- 阵营筛选按钮 -->
      <FilterTool
        :sort-text="camp_type"
        :status="select_status[0]"
        :data="select_camp"
        list-height="26.5625rem"
        @click="handleSelectStatus(0)"
        @select="onSelectCamp"
      />

      <!-- 自带属性筛选按钮 -->
      <FilterTool
        :sort-text="attr_type"
        :status="select_status[1]"
        :data="select_attr"
        @click="handleSelectStatus(1)"
        @select="onSelectAttr"
      />

      <!-- 杂项筛选按钮 -->
      <FilterTool
        :sort-text="misc_type"
        :status="select_status[2]"
        :data="select_misc"
        @click="handleSelectStatus(2)"
        @select="onSelectMisc"
      />

      <!-- 杂项排序按钮 -->
      <FilterTool
        :sort-text="misc_sort"
        :status="select_status[3]"
        :data="select_sort"
        @click="handleSelectStatus(3)"
        @select="onSelectSort"
      />

      <!-- 正序/倒序 -->
      <FilterTool
        :sort-text="sort_type"
        :status="select_status[4]"
        :data="sort_types"
        @click="handleSelectStatus(4)"
        @select="onSortType"
      />
    </div>

    <!-- 只看性别 -->
    <FilterGender @change="filterGender" />

    <!-- 搜索 -->
    <K-Input
      v-model="search_value"
      placeholder="英雄/字母"
      border-color="var(--theme-border-color-two)"
      color="var(--theme-font-color-four)"
      align="center"
      width="15em"
      font-size="1.5rem"
      :no-special="false"
      @input="handSearch"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
