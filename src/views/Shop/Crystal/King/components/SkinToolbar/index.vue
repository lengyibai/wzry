<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { KingCrystalStore } from "@/store";
import FilterGender from "@/components/business/Tool/FilterGender/index.vue";
import FilterTool from "@/components/business/Tool/FilterTool/index.vue";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { KInput, KPropNum } from "@/components/business";
import { _debounce } from "@/utils/tool";

const $emit = defineEmits<{
  /** 用于筛选后返回顶部 */
  change: [];
}>();

const $kingCrystalStore = KingCrystalStore();

const { skin_type, skin_type_list } = storeToRefs($kingCrystalStore);
const { filterSkinType, filterGender, searchSkin } = $kingCrystalStore;

/** 搜索值 */
const search_value = ref("");

/** @description 清空输入框 */
const clearName = () => {
  search_value.value = "";
  $emit("change");
};

/** @description 皮肤类型筛选
 * @param index 皮肤类型索引
 */
const onTypeFilter = (index: number) => {
  filterSkinType(skin_type_list.value[index]);
  clearName();
};

/** @description 设置性别
 * @param id 性别标识符
 */
const onFilterGender = (id: Game.GenderId) => {
  filterGender(id);
  clearName();
};

/** @description 搜索皮肤 */
const debounceSearch = _debounce(() => {
  searchSkin(search_value.value);
  $emit("change");
}, 500);

defineExpose({
  /** 清空输入框 */
  _clearName: clearName,
});
</script>

<template>
  <div class="skin-toolbar">
    <KPropNum prop-key="KING_CRYSTAL" class="k-prop-num" height="3rem" margin-right="1rem" />

    <div class="filter-select">
      <!-- 皮肤类型筛选 -->
      <FilterTool
        :options="skin_type_list"
        :sort-text="skin_type"
        list-height="26.5625rem"
        min-width="8.5rem"
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
