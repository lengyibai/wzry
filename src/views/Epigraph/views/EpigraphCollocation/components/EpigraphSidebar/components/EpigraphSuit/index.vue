<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import SuitCard from "./components/SuitCard/index.vue";

import { KButton } from "@/components/business";
import { MOUSE_TIP, SCENE_TIP } from "@/config";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { EpigraphCollocationStore } from "@/store";
import { LibDragSort } from "@/components/common";
import { $tip, $focus } from "@/utils/busTransfer";
import { _isPhone } from "@/utils/tool";

const $epigraphCollocationStore = EpigraphCollocationStore();

const suitListRef = ref<HTMLElement>();

/** 鼠标悬浮在方案上的文字 */
const mouse_tip = computed(() => {
  return (id: string) => {
    return $epigraphCollocationStore.current_suit?.id === id ? MOUSE_TIP.ph66 : MOUSE_TIP.wt86;
  };
});

/** @description 返回铭文效果页 */
const handleClose = () => {
  $epigraphCollocationStore.setSidebarStatus("EFFECT");
};

/** @description 解锁 */
const handleUnlock = () => {
  $epigraphCollocationStore.unlockSuit();
};

onMounted(() => {
  //当套装量大于2时，提示可以拖拽排序
  if ($epigraphCollocationStore.suit_list.length < 2 || _isPhone) return;

  $tip({
    text: SCENE_TIP.cl60,
    align: "left-top",
    color: false,
    createFn() {
      $focus.show(suitListRef.value!);
    },
    btnFn: $focus.close,
  });
});
</script>

<template>
  <div class="epigraph-suit">
    <div class="title">
      <span class="label">选择铭文</span>
      <i v-mouse-tip class="iconfont wzry-close" @click="handleClose" />
    </div>

    <div ref="suitListRef" v-scroll-virtualization class="suit-list">
      <LibDragSort
        v-slot="{ item }"
        :data="$epigraphCollocationStore.suit_list"
        @sort-data="$epigraphCollocationStore.updateSuitList"
      >
        <SuitCard
          v-mouse-tip="{
            text: mouse_tip(item.id),
          }"
          :data="item"
        />
      </LibDragSort>
      <div class="add-suit">
        <div class="name">铭文方案</div>
        <KButton class="k-button" @click="handleUnlock">解锁</KButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
