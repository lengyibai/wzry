<script setup lang="ts">
import { ref } from "vue";
import { getCampType } from "@/api/main/games/hero";
import heroStore from "@/store/hero";

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
];

const gender = ref(0); //性别排序
const select_camp = ref([{ label: "全部阵营", value: "全部阵营" }]);
const search_value = ref(""); //搜索值

// 获取阵营列表
getCampType().then((res) => {
  res.forEach((item) => {
    select_camp.value.push({
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

/* 设置性别 */
const handerSetGender = (type: number) => {
  gender.value = type;
  $heroStore.filterGender(type);
};

/** @description: 搜索英雄 */
const handSearch = () => {
  $heroStore.searchHero(search_value.value);
};
</script>

<template>
  <div class="hero-toolbar">
    <div class="filter-select">
      <!-- 阵营筛选按钮 -->
      <FilterTool
        :data="select_camp"
        @select="EmitSelectCamp"
        list-height="425px"
      />

      <!-- 自带属性筛选按钮 -->
      <FilterTool
        :data="select_attr"
        @select="EmitSelectAttr"
        list-height="324px"
      />

      <!-- 杂项筛选按钮 -->
      <FilterTool
        :data="select_misc"
        @select="EmitSelectMisc"
        list-height="278px"
      />

      <!-- 杂项排序按钮 -->
      <FilterTool
        :data="select_sort"
        @select="EmitSelectSort"
        list-height="186px"
      />
    </div>

    <!-- 只看性别 -->
    <div class="gender">
      <span>只看：</span>
      <i
        class="iconfont wzry-nan cursor-pointer"
        :class="{ 'nan-active': $heroStore.gender_type === 1 }"
        @click="handerSetGender(1)"
        title="男"
      />
      <i
        class="iconfont wzry-nv cursor-pointer"
        :class="{ 'nv-active': $heroStore.gender_type === 2 }"
        @click="handerSetGender(2)"
        title="女"
      />
      <i
        class="iconfont wzry-xingbie cursor-pointer"
        :class="{ 'all-active': $heroStore.gender_type === 0 }"
        @click="handerSetGender(0)"
        title="全部"
      />
    </div>

    <!-- 搜索 -->
    <K-Input
      class="input"
      placeholder="英雄/字母"
      @input="handSearch"
      border-color="var(--theme-color-three)"
      v-model="search_value"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
