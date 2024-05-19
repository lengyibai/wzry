<script setup lang="ts">
import EpigraphConstitute from "./components/EpigraphConstitute/index.vue";
import EpigraphSidebar from "./components/EpigraphSidebar/index.vue";

import { vMouseTip } from "@/directives";
import { EpigraphStore } from "@/store";
import { MOUSE_TIP } from "@/config";

const $epigraphStore = EpigraphStore();

/** @description 返回铭文列表 */
const handleList = () => {
  $epigraphStore.setStatus("LIST");
};
</script>

<template>
  <div class="epigraph-collocation">
    <div
      v-mouse-tip="{
        text: MOUSE_TIP.wc91,
      }"
      class="back"
      @click="handleList"
    ></div>
    <EpigraphConstitute />
    <EpigraphSidebar />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
