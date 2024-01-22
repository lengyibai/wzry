<script setup lang="ts">
import { computed } from "vue";

import SuitCard from "./components/SuitCard/index.vue";

import { KButton } from "@/components/business";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { EpigraphCollocationStore } from "@/store";

const $epigraphCollocationStore = EpigraphCollocationStore();

/** 鼠标悬浮在方案上的文字 */
const mouse_tip = computed(() => {
  return (id: string) => {
    return $epigraphCollocationStore.current_suit?.id === id ? MOUSE_TIP.ph66 : MOUSE_TIP.wt86;
  };
});

const handleClose = () => {
  $epigraphCollocationStore.setSidebarStatus("EFFECT");
};

/* 解锁 */
const handleUnlock = () => {
  $epigraphCollocationStore.unlockSuit();
};
</script>

<template>
  <div class="epigraph-suit">
    <div class="title">
      <span class="label">选择铭文</span>
      <i v-mouse-tip class="iconfont wzry-close" @click="handleClose" />
    </div>

    <div class="suit-list">
      <SuitCard
        v-for="(item, index) in $epigraphCollocationStore.suit_list"
        :key="index"
        v-mouse-tip="{
          text: mouse_tip(item.id),
        }"
        :data="item"
      />
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
