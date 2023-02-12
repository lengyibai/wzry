<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from "vue";

import { getCampType } from "@/api/main/games/hero";
import heroStore from "@/store/hero";
import $bus from "@/utils/eventBus";

const $heroStore = heroStore();

const select_attr = [
  { label: "全部属性", value: "全部属性" },
  { label: "无位移", value: "无位移" },
  { label: "无控制", value: "无控制" },
  { label: "位移", value: "位移" },
  { label: "免控", value: "免控" },
  { label: "回血", value: "回血" },
  { label: "真伤", value: "真伤" },
];
const select_misc = [
  { label: "全部筛选", value: "全部筛选" },
  { label: "爆发", value: "爆发" },
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
const sort_type = [
  { label: "正序", value: "正序" },
  { label: "倒序", value: "倒序" },
];

const gender = ref<Gender>(0); //性别排序
const search_value = ref(""); //搜索值
const current_index = ref(-1); //当前展开的菜单
const select_status = reactive([false, false, false, false, false]); //记录展开状态
const select_camp = reactive([{ label: "全部阵营", value: "全部阵营" }]);

gender.value = $heroStore.gender_type;

//获取阵营列表
getCampType().then((res) => {
  res.forEach((item) => {
    select_camp.push({
      label: item.name,
      value: item.name,
    });
  });
});

/* 阵营筛选 */
const EmitSelectCamp = (v: string) => {
  $heroStore.filterCamp(v);
};

/* 属性筛选 */
const EmitSelectAttr = (v: string) => {
  $heroStore.filterAttr(v);
};

/* 杂项筛选 */
const EmitSelectMisc = (v: string) => {
  $heroStore.filterMisc(v);
};

/* 杂项排序 */
const EmitSelectSort = (v: string) => {
  $heroStore.sortMisc(v);
};

/* 正序/倒序 */
const EmitSortType = (v: string) => {
  $heroStore.sortType(v);
};

/* 设置性别 */
const handerSetGender = (type: Gender) => {
  gender.value = type;
  $heroStore.filterGender(type);
};

/** 搜索英雄 */
const handSearch = () => {
  $heroStore.searchHero(search_value.value);
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

onBeforeUnmount(() => {
  $bus.off("mouseup");
});
</script>

<template>
  <div class="hero-toolbar">
    <div class="filter-select">
      <!-- 阵营筛选按钮 -->
      <FilterTool
        v-model="$heroStore.camp_type"
        :status="select_status[0]"
        :data="select_camp"
        list-height="425px"
        @click="handleSelectStatus(0)"
        @select="EmitSelectCamp"
      />

      <!-- 自带属性筛选按钮 -->
      <FilterTool
        v-model="$heroStore.attr_type"
        :status="select_status[1]"
        :data="select_attr"
        list-height="345px"
        @click="handleSelectStatus(1)"
        @select="EmitSelectAttr"
      />

      <!-- 杂项筛选按钮 -->
      <FilterTool
        v-model="$heroStore.misc_type"
        :status="select_status[2]"
        :data="select_misc"
        list-height="296px"
        @click="handleSelectStatus(2)"
        @select="EmitSelectMisc"
      />

      <!-- 杂项排序按钮 -->
      <FilterTool
        v-model="$heroStore.misc_sort"
        :status="select_status[3]"
        :data="select_sort"
        list-height="247px"
        @click="handleSelectStatus(3)"
        @select="EmitSelectSort"
      />

      <!-- 正序/倒序 -->
      <FilterTool
        v-model="$heroStore.sort_type"
        :status="select_status[4]"
        :data="sort_type"
        list-height="100px"
        @click="handleSelectStatus(4)"
        @select="EmitSortType"
      />
    </div>

    <!-- 只看性别 -->
    <FilterGender v-model="gender" @update:model-value="handerSetGender" />

    <!-- 搜索 -->
    <K-Input
      v-model="search_value"
      placeholder="英雄/字母"
      border-color="var(--theme-color-three)"
      color="var(--theme-color-five)"
      align="center"
      width="15em"
      font-size="24px"
      :no-special="false"
      @input="handSearch"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
