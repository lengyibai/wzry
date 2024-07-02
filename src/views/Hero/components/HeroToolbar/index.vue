<script setup lang="ts">
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";

import { HeroStore } from "@/store";
import { FilterGender, FilterTool, KInput } from "@/components/business";
import { LOCAL_TYPE } from "@/api";
import { vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";
import { _debounce } from "@/utils/tool";

const $emit = defineEmits<{
  /** 用于筛选后返回顶部 */
  change: [];
}>();

const $heroStore = HeroStore();

const { sort_type, attr_type, camp_type, misc_type, misc_sort, have_type, exp_type, gender_type } =
  storeToRefs($heroStore);

const select_attr = ["全部属性", "非硬控", "免控", "回血", "真伤"];
const select_misc = ["全部筛选", "团控", "无蓝条", "非人类", "多套技能"];
const select_sort = ["全部排序", "身高", "上手难度", "皮肤数量", "关系数量"];
const have_types = ["全部英雄", "未拥有", "已拥有"];
const exp_types = ["全部熟练度", "由低到高", "由高到低"];
const sort_types = ["正序", "倒序"];

/** 搜索值 */
const search_value = ref("");
/** 阵营列表 */
const select_camp = reactive<string[]>([]);

/** @description 获取阵营列表 */
const getTypeCampList = async () => {
  (await LOCAL_TYPE.getTypeCampList()).forEach((item) => {
    select_camp.push(item.value);
  });
};
getTypeCampList();

/** @description 清空输入框 */
const clearName = () => {
  search_value.value = "";
  $emit("change");
};

/** @description 阵营筛选
 * @param index 阵营类型索引
 */
const onSelectCamp = (index: number) => {
  $heroStore.filterCamp(select_camp[index]);
  clearName();
};

/** @description 属性筛选
 * @param index 属性类型索引
 */
const onSelectAttr = (index: number) => {
  $heroStore.filterAttr(select_attr[index]);
  clearName();
};

/** @description 杂项筛选
 * @param index 杂项类型索引
 */
const onSelectMisc = (index: number) => {
  $heroStore.filterMisc(select_misc[index]);
  clearName();
};

/** @description 杂项排序
 * @param index 杂项排序类型索引
 */
const onSelectSort = (index: number) => {
  $heroStore.sortMisc(select_sort[index]);
  clearName();
};

/** @description 是否拥有排序
 * @param index 拥有类型索引
 */
const onHaveType = (index: number) => {
  $heroStore.haveType(have_types[index]);
  clearName();
};

/** @description 熟练度排序
 * @param index 熟练度类型索引
 */
const onExpType = (index: number) => {
  $heroStore.expType(exp_types[index]);
  clearName();
};

/** @description 正序/倒序
 * @param index 排序类型索引
 */
const onSortType = (index: number) => {
  $heroStore.sortType(sort_types[index]);
  clearName();
};

/** @description 性别切换
 * @param name 性别标识符
 */
const onFilterGender = (name: Game.GenderId) => {
  $heroStore.filterGender(name);
  clearName();
};

/** @description 搜索英雄 */
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
        :options="select_camp"
        list-height="26.5625rem"
        @select="onSelectCamp"
      />

      <!-- 自带属性筛选按钮 -->
      <FilterTool :sort-text="attr_type" :options="select_attr" @select="onSelectAttr" />

      <!-- 杂项筛选按钮 -->
      <FilterTool :sort-text="misc_type" :options="select_misc" @select="onSelectMisc" />

      <!-- 杂项排序按钮 -->
      <FilterTool :sort-text="misc_sort" :options="select_sort" @select="onSelectSort" />

      <!-- 熟练度排序 -->
      <FilterTool :sort-text="exp_type" :options="exp_types" @select="onExpType" />

      <!-- 拥有排序 -->
      <FilterTool :sort-text="have_type" :options="have_types" @select="onHaveType" />

      <!-- 正序/倒序 -->
      <FilterTool :sort-text="sort_type" :options="sort_types" @select="onSortType" />
    </div>

    <!-- 只看性别 -->
    <FilterGender v-model="gender_type" @update:model-value="onFilterGender" />

    <!-- 搜索 -->
    <KInput
      v-model="search_value"
      v-mouse-tip="{
        text: MOUSE_TIP.kb43,
        type: 'INPUT',
      }"
      :required="false"
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
