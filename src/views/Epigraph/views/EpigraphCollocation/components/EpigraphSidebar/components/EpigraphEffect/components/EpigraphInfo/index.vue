<script setup lang="ts">
import { EpigraphCollocationStore } from "@/store";

const $epigraphCollocationStore = EpigraphCollocationStore();
</script>

<template>
  <div class="epigraph-info">
    <div
      v-for="(item, index) in $epigraphCollocationStore.epigraph_info"
      :key="index"
      class="epigraph-box"
    >
      <img class="icon" :src="item.epigraph?.img" alt="" />
      <div class="count">{{ item.epigraph?.name }}x{{ item.count }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
