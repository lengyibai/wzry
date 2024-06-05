<script setup lang="ts">
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";

import { HeroDebrisStore } from "@/store";
import { FilterGender, FilterTool, KInput, KPropNum } from "@/components/business";
import { LOCAL_TYPE } from "@/api";
import { vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";
import { _debounce } from "@/utils/tool";

const $emit = defineEmits<{
  /** 用于筛选后返回顶部 */
  change: [];
}>();

const $heroDebrisStore = HeroDebrisStore();

const { price_type } = storeToRefs($heroDebrisStore);

const select_price = ["全部价格", "由低到高", "由高到低"];

/** 搜索值 */
const search_value = ref("");
/** 阵营列表 */
const select_camp = reactive<Global.General[]>([]);

//获取阵营列表
LOCAL_TYPE.getTypeCampList().then((data) => {
  data.forEach((item) => {
    select_camp.push({
      label: item.value,
      value: item.value,
    });
  });
});

/** @description 清空输入框 */
const clearName = () => {
  search_value.value = "";
  $emit("change");
};

/** @description 价格排序
 * @param index 价格类型索引
 */
const onPriceSort = (index: number) => {
  $heroDebrisStore.sortPrice(select_price[index]);
  clearName();
};

/** @description 性别切换
 * @param name 性别标识符
 */
const onFilterGender = (id: Game.GenderId) => {
  $heroDebrisStore.filterGender(id);
  clearName();
};

/** @description 搜索英雄 */
const debounceSearch = _debounce(() => {
  $heroDebrisStore.searchHero(search_value.value);
  $emit("change");
}, 500);

defineExpose({
  /** 清空输入框 */
  _clearName: clearName,
});
</script>

<template>
  <div class="hero-toolbar">
    <KPropNum prop-key="HERO_DEBRIS" height="3rem" class="k-prop-num" margin-right="1rem" />

    <div class="filter-select">
      <!-- 价格排序 -->
      <FilterTool :options="select_price" :sort-text="price_type" @select="onPriceSort" />
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
      placeholder="英雄/字母"
      :no-special="false"
      @input="debounceSearch"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
