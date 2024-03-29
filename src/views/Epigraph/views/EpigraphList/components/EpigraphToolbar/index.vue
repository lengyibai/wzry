<script setup lang="ts">
import { onMounted, ref } from "vue";
import _debounce from "lodash/debounce";

import FilterColor from "./components/FilterColor/index.vue";

import { AudioStore, EpigraphStore } from "@/store";
import { KButton, KInput } from "@/components/business";
import { MOUSE_TIP, SCENE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { $focus, $tip } from "@/utils";

const $epigraphStore = EpigraphStore();
const $audioStore = AudioStore();

const collocationBtnRef = ref<InstanceType<typeof KButton>>();

/** 搜索值 */
const search_value = ref("");

/* 清空输入框 */
const clearName = () => {
  search_value.value = "";
};

/* 进入铭文搭配 */
const handleCollocation = () => {
  $epigraphStore.setStatus("COLLOCATION");
  $audioStore.play("pj83");
};

/* 设置显示的铭文颜色 */
const onFilterColor = (type?: Game.Epigraph.Data["color"]) => {
  $epigraphStore.filterColor(type);
  clearName();
};

/* 搜索皮肤 */
const debounceSearch = _debounce(() => {
  $epigraphStore.searchEpigraph(search_value.value);
}, 500);

onMounted(() => {
  $tip({
    text: SCENE_TIP.f1y0,
    align: "left-bottom",
    color: false,
    createFn() {
      $focus.show(collocationBtnRef.value!.$el);
    },
    btnFn: $focus.close,
  });
});

defineExpose({
  /** 清空输入框 */
  _clearName: clearName,
});
</script>

<template>
  <div class="epigraph-toolbar">
    <!-- 铭文搭配 -->
    <KButton ref="collocationBtnRef" v-mouse-tip class="k-button" @click="handleCollocation">
      进入铭文搭配
    </KButton>
    <!-- 筛选铭文颜色 -->
    <FilterColor @change="onFilterColor" />

    <!-- 搜索 -->
    <KInput
      v-model="search_value"
      v-mouse-tip="{
        text: MOUSE_TIP.kb43,
        type: 'INPUT',
      }"
      placeholder="英雄/皮肤"
      :required="false"
      @input="debounceSearch"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
