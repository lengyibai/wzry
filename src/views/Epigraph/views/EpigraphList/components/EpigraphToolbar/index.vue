<script setup lang="ts">
import { onMounted, ref } from "vue";

import FilterColor from "./components/FilterColor/index.vue";

import { EpigraphStore } from "@/store";
import { KButton, KInput } from "@/components/business";
import { MOUSE_TIP, SCENE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { $tip, $focus } from "@/utils/busTransfer";
import { usePlayAudio } from "@/hooks";
import { _debounce } from "@/utils/tool";

const $epigraphStore = EpigraphStore();

const { playAudio } = usePlayAudio();

const collocationBtnRef = ref<InstanceType<typeof KButton>>();

/** 搜索值 */
const search_value = ref("");

/** @description 清空输入框 */
const clearName = () => {
  search_value.value = "";
};

/** @description 进入铭文搭配 */
const handleCollocation = () => {
  $epigraphStore.setStatus("COLLOCATION");
  playAudio("pj83");
};

/** @description 设置显示的铭文颜色
 * @param color 铭文颜色
 */
const onFilterColor = (color?: Game.Epigraph.Data["color"]) => {
  $epigraphStore.filterColor(color);
  clearName();
};

/** @description 搜索皮肤 */
const debounceSearch = _debounce(() => {
  $epigraphStore.searchEpigraph(search_value.value);
}, 500);

onMounted(() => {
  setTimeout(() => {
    $tip({
      text: SCENE_TIP.f1y0,
      align: "left-bottom",
      color: false,
      createFn() {
        $focus.show(collocationBtnRef.value!.$el);
      },
      btnFn: $focus.close,
    });
  }, 500);
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
    <FilterColor v-model="$epigraphStore.color" @update:model-value="onFilterColor" />

    <!-- 搜索 -->
    <KInput
      v-model="search_value"
      v-mouse-tip="{
        text: MOUSE_TIP.kb43,
        type: 'INPUT',
      }"
      class="k-input"
      placeholder="铭文名称"
      :required="false"
      @input="debounceSearch"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
