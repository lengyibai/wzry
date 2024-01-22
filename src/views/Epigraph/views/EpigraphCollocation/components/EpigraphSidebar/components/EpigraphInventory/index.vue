<script setup lang="ts">
import { ref } from "vue";
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import EpigraphCard from "./components/EpigraphCard/index.vue";

import { EpigraphCollocationStore } from "@/store";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

const $epigraphCollocationStore = EpigraphCollocationStore();

const { fill_color, is_all_empty } = storeToRefs($epigraphCollocationStore);

const epigraphListRef = ref<HTMLElement>();

/** 鼠标悬浮在库存铭文上的文字 */
const moust_tip = computed(() => {
  const _id = $epigraphCollocationStore.color_id_selected;
  return (id: number) => {
    if (_id === 0) {
      return MOUSE_TIP.fe59;
    } else {
      return id === _id ? MOUSE_TIP.w0h6 : MOUSE_TIP.sb17;
    }
  };
});

/* 关闭库存 */
const handleClose = () => {
  $epigraphCollocationStore.closeInventory();
};

/* 切换颜色时回调顶部 */
watch(fill_color, () => {
  epigraphListRef.value!.scrollTop = 0;
});
</script>

<template>
  <div class="epigraph-inventory">
    <div class="title">
      <div class="label">铭文库存</div>
      <i
        v-if="!is_all_empty"
        v-mouse-tip="{
          text: MOUSE_TIP.ir00,
        }"
        class="iconfont wzry-close"
        @click="handleClose"
      />
    </div>
    <div ref="epigraphListRef" class="epigraph-list">
      <template v-for="(item, index) in $epigraphCollocationStore.current_inventory" :key="index">
        <EpigraphCard
          v-mouse-tip="{
            text: moust_tip(item.epigraph.id),
          }"
          :data="item.epigraph"
          :count="item.count"
        />
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
