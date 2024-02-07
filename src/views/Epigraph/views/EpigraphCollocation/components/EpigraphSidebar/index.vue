<script setup lang="ts">
import EpigraphEffect from "./components/EpigraphEffect/index.vue";
import EpigraphInventory from "./components/EpigraphInventory/index.vue";
import EpigraphSuit from "./components/EpigraphSuit/index.vue";

import type { EpigraphCollocationStoreType } from "@/store/interface";
import { EpigraphCollocationStore } from "@/store";

const $epigraphCollocationStore = EpigraphCollocationStore();

const comps: Record<EpigraphCollocationStoreType.SidebarStatus, any> = {
  EFFECT: EpigraphEffect,
  INVENTORY: EpigraphInventory,
  SUIT: EpigraphSuit,
};
</script>

<template>
  <div class="epigraph-sidebar">
    <transition name="move" appear>
      <component :is="comps[$epigraphCollocationStore.sidebar_status]"></component>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
