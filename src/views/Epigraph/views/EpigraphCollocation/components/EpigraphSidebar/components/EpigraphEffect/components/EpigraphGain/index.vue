<script setup lang="ts">
import { EpigraphCollocationStore } from "@/store";

const $epigraphCollocationStore = EpigraphCollocationStore();
</script>

<template>
  <div
    v-for="(item, index) in $epigraphCollocationStore.epigraph_attr"
    :key="index"
    class="effect-box"
  >
    <div class="label">{{ item.label }}</div>
    <div class="value">+{{ item.value }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
